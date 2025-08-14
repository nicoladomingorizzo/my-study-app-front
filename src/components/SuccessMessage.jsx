export default function SuccessMessage({ successMessage }) {
    return (

        <>
            {successMessage && (
                <div className="alert alert-success mt-3 w-75 mx-auto text-center" role="alert">
                    {successMessage}
                </div>
            )}
        </>

    )
}