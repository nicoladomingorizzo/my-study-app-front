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
    handleEraseUpdateTask
}) {
    return (
        <form onSubmit={editingTaskId ? handleSubmitUpdate : handleSubmitCreate}>
            <input
                type="text"
                placeholder="Titolo"
                className="form-control mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Descrizione"
                className="form-control mb-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                className="form-control mb-2"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                    {editingTaskId ? "Aggiorna Task" : "Crea Task"}
                </button>
                {editingTaskId && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleEraseUpdateTask}
                    >
                        Annulla
                    </button>
                )}
            </div>
        </form>
    );
}
