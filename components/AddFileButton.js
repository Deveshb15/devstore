import React from 'react'
import { useAuth } from '../context/AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage, database } from '../config/firebase'
import { addDoc } from 'firebase/firestore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BsCloudUploadFill } from 'react-icons/bs'

import { ROOT_FOLDER } from '../hooks/useFolder'

export default function AddFileButton({ currentFolder }) {

    const { user } = useAuth()

    function handleUpload(e) {
        e.preventDefault()

        const file = e.target.files[0]

        if(currentFolder == null || file == null) return 

        const parentPath = currentFolder.path.length > 0 ? 
        currentFolder.path.map(p => p.name).join("/") : ''
        // console.log(parentPath)
        const filePath =
        currentFolder === ROOT_FOLDER
        ? `${parentPath}/${file.name}`
        : `${parentPath}/${currentFolder.name}/${file.name}`

        const storageRef = ref(storage, `/files/${user.uid}/${filePath}`)
        const uploadTask = uploadBytes(storageRef, file).then((snapshot) => {
            // console.log("Uploaded")
            // console.log(snapshot)
            getDownloadURL(snapshot.ref).then(async(url) => {
                // console.log(url)
                await addDoc(database.files, {
                    name: file.name,
                    url: url,
                    createdAt: new Date(),
                    folderId: currentFolder.id,
                    userId: user.uid
                })
            })
        }).catch((err) => console.log(err))

        // toast.success('🦄 Wow so easy!', {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        // });
        toast.promise(uploadTask, {
            pending: 'File Uploading...',
            success: 'File Uploaded.',
            error: 'File not uploaded!!',
        })
    }

    return (
        <label className='mx-2 p-4 border rounded-xl shadow-md hover:bg-black hover:text-white cursor-pointer'>
            <BsCloudUploadFill size={20} />
            <input type="file" onChange={currentFolder && handleUpload} style={{opacity: 0, left: '-9999px', position: 'absolute'}}  />
            <ToastContainer
                theme='dark'
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </label>
    )
}
