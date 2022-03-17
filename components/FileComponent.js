import React from 'react'

import { BsFillFileEarmarkMinusFill } from 'react-icons/bs'

export default function FileComponent({ file }) {
    return (
        <div className='flex my-2 py-2 px-2'>
            <a href={file.url} target="_blank" rel="noreferrer">
                <div className='flex items-center border rounded-md px-2 py-1 cursor-pointer hover:bg-black hover:text-white'>
                    <BsFillFileEarmarkMinusFill />
                    <p className='ml-1'>{file.name}</p>
                </div>
            </a>
        </div>
    )
}
