export default function TaskForm({
    editingTaskId,
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    handleSubmitCreate,
    handleSubmitUpdate,
    handleEraseUpdateTask,
}) {
    return (
        <>
            {/* 🔘 Bottone che apre la modale */}
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#taskModal"
            >
                {editingTaskId ? "Modifica Task" : "Nuova Task"}
            </button>

            {/* 🪟 Modale */}
            <div
                className="modal fade"
                id="taskModal"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {editingTaskId ? "Modifica Task" : "Crea Task"}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Chiudi"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <form
                                onSubmit={
                                    editingTaskId ? handleSubmitUpdate : handleSubmitCreate
                                }
                                className="row g-2"
                            >
                                <div className="col-12 col-md-4 text-center">
                                    <input
                                        className="text-center p-3 form-control"
                                        type="text"
                                        value={title}
                                        placeholder="Inserisci una nuova task..."
                                        onChange={(e) => setTitle(e.target.value)}
                                        maxLength={15}
                                    />
                                    <small className="form-text text-muted">
                                        {title.length}/15 caratteri
                                    </small>
                                </div>

                                <div className="col-12 col-md-4 text-center">
                                    <input
                                        className="text-center p-3 form-control"
                                        type="text"
                                        value={description}
                                        placeholder="Inserisci una descrizione..."
                                        onChange={(e) => setDescription(e.target.value)}
                                        maxLength={50}
                                    />
                                    <small className="form-text text-muted">
                                        {description.length}/50 caratteri
                                    </small>
                                </div>

                                <div className="col-12 col-md-4 text-center">
                                    <input
                                        className="text-center p-3 form-control"
                                        type="date"
                                        value={dueDate}
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={(e) => setDueDate(e.target.value)}
                                    />
                                    <small className="form-text text-muted">
                                        Inserisci la data di scadenza
                                    </small>
                                </div>

                                <div className="col-12 d-flex justify-content-end mt-3 gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-dark"
                                        data-bs-dismiss="modal"
                                    >
                                        <i className="bi bi-send-arrow-down pe-2"></i>
                                        {editingTaskId ? "Aggiorna task" : "Aggiungi task"}
                                    </button>

                                    {editingTaskId && (
                                        <button
                                            type="button"
                                            className="btn btn-outline-warning"
                                            onClick={handleEraseUpdateTask}
                                            data-bs-dismiss="modal"
                                        >
                                            <i className="bi bi-x-octagon pe-2"></i>
                                            Annulla modifica
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
