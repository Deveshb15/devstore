import React from 'react'

import AddFolderButton from '../components/AddFolderButton'
import useFolder from '../hooks/useFolder'
import FolderComponent from '../components/FolderComponent'
import FolderBreadCrumbs from '../components/FolderBreadCrumbs'

const Folder = () => {

    const { folder, childFolders} = useFolder(null)
    // console.log(folder)
    return (
        <div className='m-2'>
            <div className='flex items-center justify-between pr-8'>
                <FolderBreadCrumbs currentFolder={folder} />
                <AddFolderButton currentFolder={folder} />
            </div>
            <div className='flex'>
                {childFolders.length > 0 && (
                    childFolders.map(childFolder => (
                        <div key={childFolder.id}>
                            <FolderComponent folder={childFolder} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Folder