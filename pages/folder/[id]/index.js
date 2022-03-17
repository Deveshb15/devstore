import { useRouter } from "next/router";

import useFolder from "../../../hooks/useFolder";
import AddFolderButton from "../../../components/AddFolderButton";
import FolderComponent from "../../../components/FolderComponent";
import FolderBreadCrumbs from "../../../components/FolderBreadCrumbs";

const FolderId = () => {

    const router = useRouter()
    // console.log(router)
    const { id } = router.query; 
    // console.log(id)
    // console.log(router.query)
    const { folder, childFolders} = useFolder(id)
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

export default FolderId