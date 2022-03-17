import React, {useState} from 'react'
import Modal from 'react-modal';
import { database } from '../config/firebase';
import { addDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

import { BsFolderPlus } from 'react-icons/bs'

import { ROOT_FOLDER } from '../hooks/useFolder'


Modal.setAppElement('#__next')
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '12px'
    },
};

export default function AddFolderButton({ currentFolder }) {

    const [name, setName] = useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const { user } = useAuth()

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if(currentFolder == null) return 

        let path = [...currentFolder.path]
        if(currentFolder !== ROOT_FOLDER) {
            path.push({name: currentFolder.name, id: currentFolder.id})
        }

        await addDoc(database.folders, {
            name,
            userId: user.uid,
            createdAt: new Date(),
            parentId: currentFolder.id,
            path: path
        })

        setName("")
        closeModal()
    }

    return (
        <div>
            <button onClick={openModal} className='mx-2 p-4 border rounded-xl shadow-md hover:bg-black hover:text-white'>
                <BsFolderPlus size={20} />
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col my-4 px-4 py-2'>
                        <label htmlFor='folderName' className='text-xl font-bold mb-2'>Folder Name</label>
                        <input 
                            type='text' 
                            id='folderName' 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border rounded-xl p-3' 
                            required
                            autoFocus />
                    </div>
                    <div className='flex justify-end'>
                        <button onClick={closeModal} className='mx-2 p-3 border rounded-xl hover:bg-black hover:text-white'>Close</button>
                        <button type='submit' className='mx-2 p-3 border rounded-xl bg-black text-white hover:bg-gray-300 hover:text-black'>Add Folder</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
