export default function TaskCompleted({ completedTasksList, handleUnsuccessClick, handleRemoveClick }) {
    return (

        <>

            <h2 className="text-center mt-5 mb-5">Task Completate</h2>
            <ul className="list-group list-group-flush list-unstyled">
                {
                    completedTasksList.length > 0 ?
                        (
                            completedTasksList.map(completeTask => {
                                return (
                                    <li key={completeTask.id} className="d-flex justify-content-between align-items-start">
                                        <p className="mb-1"><b>Task Completata: </b>{completeTask.title}</p>
                                        <p><b>Descriszione Task: </b>{completeTask.description}</p>
                                        <div className="buttons d-flex">
                                            <button className="btn btn-outline-warning btn-sm me-2" onClick={() => handleUnsuccessClick(completeTask.id)}>
                                                <i className="bi bi-check2-square"></i>
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm " onClick={() => handleRemoveClick(completeTask.id)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </li>
                                )
                            })
                        ) : (
                            <li>
                                <p className="text-center fs-4 mb-5">Nessuna task ancora completata</p>
                            </li>
                        )}
            </ul>
        </>

    )
}