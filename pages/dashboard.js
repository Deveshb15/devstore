import React from 'react'

import AddFolderButton from '../components/AddFolderButton'
import useFolder from '../hooks/useFolder'
import Folder from '../components/Folder'

const Dashboard = () => {

    const { folder, childFolders} = useFolder("erQqq5fGwSbPYmMLhniB")
    // console.log(folder)

    return (
        <div className='m-2'>
            <AddFolderButton currentFolder={folder} />
            <div className='flex'>
                {childFolders.length > 0 && (
                    childFolders.map(childFolder => (
                        <div key={childFolder.id}>
                            <Folder folder={childFolder} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Dashboard