import React, {useState} from 'react'
import Modal from 'react-modal';

import { BsFolderPlus } from 'react-icons/bs'


Modal.setAppElement('#__next')
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function AddFolderButton() {

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal} className='p-3 border rounded-xl hover:bg-black hover:text-white'>
                <BsFolderPlus />
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <form>
                    <div className='flex flex-col my-4 px-4 py-2'>
                        <label htmlFor='folderName' className='text-xl font-bold mb-2'>Folder Name</label>
                        <input type='text' id='folderName' className='border rounded-xl p-3' required />
                    </div>
                    <div>
                        <button onClick={closeModal} className='p-3 border rounded-xl hover:bg-black hover:text-white'>Close</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
