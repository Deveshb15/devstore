import React from 'react'
import Link from 'next/link'

import { BsFillFolderFill } from 'react-icons/bs'

export default function Folder({ folder }) {
    return (
        <div className='flex my-2 py-2 px-2'>
            {/* eslint-disable-next-line @next/next/link-passhref */}
            <Link href={`/folder/${folder.id}`}>
                <div className='flex items-center border rounded-md px-2 py-1 cursor-pointer hover:bg-black hover:text-white'>
                    <BsFillFolderFill />
                    <p className='ml-1'>{folder.name}</p>
                </div>
            </Link>
        </div>
    )
}
