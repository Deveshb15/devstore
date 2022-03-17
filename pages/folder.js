import React from 'react'

import AddFolderButton from '../components/AddFolderButton'
import useFolder from '../hooks/useFolder'
import FolderComponent from '../components/FolderComponent'
import FolderBreadCrumbs from '../components/FolderBreadCrumbs'
import AddFileButton from '../components/AddFileButton'
import FileComponent from '../components/FileComponent'

const Folder = () => {

    const { folder, childFolders, childFiles } = useFolder(null)
    // console.log(folder)
    return (
        <div className='m-2'>
            <div className='flex items-center justify-between pr-8'>
                <FolderBreadCrumbs currentFolder={folder} />
                <div className="flex">
                    <AddFolderButton currentFolder={folder} />
                    <AddFileButton currentFolder={folder} />
                </div>
            </div>
            <div className='flex items-center'>
                {childFolders.length > 0 && (
                    childFolders.map(childFolder => (
                        <div key={childFolder.id}>
                            <FolderComponent folder={childFolder} />
                        </div>
                    ))
                )}

                {childFolders.length > 0 && childFiles.length > 0 && <hr />}

                {childFiles.length > 0 && (
                    childFiles.map(childFile => (
                        <div key={childFile.id}>
                            <FileComponent file={childFile} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Folder