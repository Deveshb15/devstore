import { useRouter } from "next/router";

import useFolder from "../../../hooks/useFolder";
import AddFolderButton from "../../../components/AddFolderButton";
import FolderComponent from "../../../components/FolderComponent";
import FolderBreadCrumbs from "../../../components/FolderBreadCrumbs";
import AddFileButton from "../../../components/AddFileButton";
import FileComponent from "../../../components/FileComponent";

const FolderId = () => {

    const router = useRouter()
    // console.log(router)
    const { id } = router.query; 
    // console.log(id)
    // console.log(router.query)
    const { folder, childFolders, childFiles } = useFolder(id)
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

export default FolderId