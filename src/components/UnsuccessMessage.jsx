export default function UnsuccessMessage({ unsuccessMessage }) {
    return (
        <>
            {unsuccessMessage && (
                <div className="alert alert-warning mt-3 w-75 mx-auto text-center" role="alert">
                    {unsuccessMessage}
                </div>
            )}
        </>
    )
}