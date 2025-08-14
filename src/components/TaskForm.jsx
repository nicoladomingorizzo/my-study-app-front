export default function TaskForm({ editingTaskId, title, setTitle, description, setDescription, dueDate, setDueDate, handleSubmitCreate, handleSubmitUpdate }) {

    return (

        <div className="container">
            <form onSubmit={editingTaskId ? handleSubmitUpdate : handleSubmitCreate} className="row g-2">
                <div className="col-12 col-md-3 text-center">
                    <input
                        className="text-center p-3 form-control"
                        type="text"
                        value={title}
                        placeholder="Inserisci una nuova task..."
                        onChange={e => setTitle(e.target.value)}
                        maxLength={15} />
                    <small className="form-text text-muted">
                        {title.length}/15 caratteri
                    </small>
                </div>
                <div className="col-12 col-md-3 text-center">
                    <input
                        className="text-center p-3 form-control"
                        type="text"
                        value={description}
                        placeholder="Inserisci una descrizione della task..."
                        onChange={e => setDescription(e.target.value)}
                        maxLength={50} />
                    <small className="form-text text-muted">
                        {description.length}/50 caratteri
                    </small>

                </div>
                <div className="col-12 col-md-3 text-center">
                    <input
                        className="text-center p-3 form-control"
                        type="date"
                        value={dueDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => setDueDate(e.target.value)} />
                    <small className="form-text text-muted">
                        Inserisci la data di scadenza
                    </small>
                </div>
                <div className="col-12 col-md-2 d-grid">
                    <button className="btn btn-outline-dark bg-white text-dark p-3 flex-shrink-0 text-nowrap">
                        <i className="bi bi-send-arrow-down pe-2"></i>
                        {editingTaskId ? 'Aggiorna' : 'Invia'}
                    </button>
                </div>
            </form>
        </div>

    )
}