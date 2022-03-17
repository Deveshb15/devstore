import React from 'react'
import Link from 'next/link'

import { ROOT_FOLDER } from '../hooks/useFolder' 

function FolderBreadCrumbs({ currentFolder }) {

    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if (currentFolder) path = [...path, ...currentFolder.path]

    // console.log(path)
    return (
        <div>
            <nav className="px-5 py-3 rounded-md w-full">
                <ol className="list-reset flex">
                    {path.map((folder, index) => {
                        // console.log(folder)
                        return (
                            <div className='flex' key={index}>
                                {/* eslint-disable-next-line @next/next/link-passhref */}
                                <Link href={folder.id ? folder.id : '/'}>
                                    <li className='cursor-pointer'>{folder.name}</li>
                                </Link>
                                <li><span className="text-gray-500 mx-2">/</span></li>
                            </div>
                        )
                    })}
                </ol>
            </nav>
        </div>
    )
}

export default FolderBreadCrumbs