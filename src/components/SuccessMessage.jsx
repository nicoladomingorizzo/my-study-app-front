export default function SuccessMessage({ successMessage }) {
    return (
        <>
            {successMessage && (
                <div className="alert alert-success mt-3 w-75 mx-auto" role="alert">
                    {successMessage}
                </div>
            )}
        </>
    )
}