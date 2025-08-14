export default function TaskCard({ handleRemoveClick, handleSuccessClick, handleUpdateTask, formatItalian, tasks }) {

    return (
        <>

            {
                tasks.length > 0 ? (tasks.map(task => {
                    return (
                        <div className="col" key={task.id}>
                            <div className="card mx-auto my-2 p-3" style={{ maxWidth: '900px' }}>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <p className="m-0"><strong>Task: </strong>{task.title}</p>
                                    <button className="btn btn-outline-warning btn-sm" onClick={() => handleUpdateTask(task)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <p className="m-0"><strong>Descrizione: </strong> {task.description}</p>
                                    <button className="btn btn-outline-warning btn-sm" onClick={() => handleUpdateTask(task)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <p className="m-0">
                                        <strong>Scadenza: </strong> {formatItalian(task.due_date)}
                                    </p>
                                    <button className="btn btn-outline-warning btn-sm" onClick={() => handleUpdateTask(task)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-outline-success btn-sm" onClick={() => handleSuccessClick(task.id)}>
                                        <i className="bi bi-check2-square"></i>
                                    </button>
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveClick(task.id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })) : (
                    <h3 className="my-5 mx-auto text-center">
                        Nessuna Task ancora creata, creane una.
                    </h3>
                )
            }
        </>

    )
}