import { useEffect, useState } from "react";

export default function TaskForm({ editingTaskId, title, setTitle, description, setDescription, dueDate, setDueDate, handleSubmitCreate, handleSubmitUpdate, handleEraseUpdateTask, }) {
    const [isOpen, setIsOpen] = useState(false);

    // 🔹 Apri automaticamente se entra in modalità modifica
    useEffect(() => {
        if (editingTaskId) {
            setIsOpen(true);
        }
    }, [editingTaskId]);

    // 🔹 Chiudi e resetta eventuale stato
    const handleClose = () => {
        setIsOpen(false);
        if (editingTaskId) handleEraseUpdateTask();
    };

    // 🔹 Invio form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTaskId) {
            handleSubmitUpdate(e);
        } else {
            handleSubmitCreate(e);
        }
        setIsOpen(false);
    };

    return (
        <>
            {/* 🔘 Bottone centrato */}
            <div className="d-flex justify-content-center my-3">
                <button
                    type="button"
                    className="btn btn-outline-primary d-flex align-items-center gap-2"
                    onClick={() => setIsOpen(true)}
                >
                    <i className="bi bi-arrow-down-circle"></i>
                    {editingTaskId ? "Modifica Task" : "Nuova Task"}
                </button>
            </div>

            {/* 🪟 Overlay */}
            {isOpen && <div className="modal-backdrop fade show"></div>}

            {/* 🪟 Modale */}
            <div
                className={`modal ${isOpen ? "show d-block" : ""}`}
                tabIndex="-1"
                role="dialog"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Header */}
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {editingTaskId ? "Modifica Task" : "Crea Task"}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleClose}
                            ></button>
                        </div>

                        {/* Body */}
                        <div className="modal-body">
                            <form onSubmit={handleSubmit} className="row g-2">
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
                                    <button type="submit" className="btn btn-outline-dark">
                                        <i className="bi bi-send-arrow-down pe-2"></i>
                                        {editingTaskId ? "Aggiorna task" : "Aggiungi task"}
                                    </button>

                                    {editingTaskId && (
                                        <button
                                            type="button"
                                            className="btn btn-outline-warning"
                                            onClick={handleClose}
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
