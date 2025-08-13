export default function TaskForm({ setTasks, apiUrl, setSuccessMessage, setEditingTaskId, editingTaskId, title, setTitle, description, setDescription, dueDate, setDueDate, handleSubmitCreate, handleSubmitUpdate }) {

    return (
        <section className="sticky-bottom bg-white pt-3 pb-4 border-top shadow-sm bg-body-tertiary">
            <div className="container">
                <form onSubmit={editingTaskId ? handleSubmitUpdate : handleSubmitCreate} className="row g-2">
                    <div className="col-12 col-md-3">
                        <input
                            className="text-center p-3 form-control"
                            type="text"
                            value={title}
                            placeholder="Inserisci una nuova task..."
                            onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-3">
                        <input
                            className="text-center p-3 form-control"
                            type="text"
                            value={description}
                            placeholder="Inserisci una descrizione della task..."
                            onChange={e => setDescription(e.target.value)}
                            maxLength={50} />
                        <small className="form-text text-muted ps-1">
                            {description.length}/50 caratteri
                        </small>

                    </div>
                    <div className="col-12 col-md-3">
                        <input
                            className="text-center p-3 form-control"
                            type="date"
                            value={dueDate}
                            placeholder="Inserisci una data di scadenza"
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => setDueDate(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-2 d-grid">
                        <button className="btn btn-outline-dark bg-white text-dark p-3 flex-shrink-0 text-nowrap">
                            <i className="bi bi-send-arrow-down pe-2"></i>
                            {editingTaskId ? 'Aggiorna' : 'Invia'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}