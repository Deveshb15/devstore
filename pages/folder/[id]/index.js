import { useRouter } from "next/router";

const FolderId = () => {
    const router = useRouter();
    console.log(router)
    const { id } = router.query;

    return (
        <div>
            <p>Folder: {id}</p>
        </div>
    )
}

export default FolderId