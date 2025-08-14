export default function DeleteMessage({ deleteMessage }) {
    return (

        <>
            {deleteMessage && (
                <div className="alert alert-danger mt-3 w-75 mx-auto text-center" role="alert">
                    {deleteMessage}
                </div>
            )}
        </>

    )
}