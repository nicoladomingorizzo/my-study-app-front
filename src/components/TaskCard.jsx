import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

export default function TaskCard({ handleRemoveClick, handleSuccessClick, handleUpdateTask, formatItalian, tasks }) {

    // Stato per la modale di conferma
    const [showModal, setShowModal] = useState(false);
    const [taskToDeleteId, setTaskToDeleteId] = useState(null);

    // Funzione per aprire la modale
    const openConfirmModal = (id) => {
        setTaskToDeleteId(id);
        setShowModal(true);
    };

    // Funzione per chiudere la modale e resettare lo stato
    const closeConfirmModal = () => {
        setShowModal(false);
        setTaskToDeleteId(null);
    };

    // Funzione per confermare l'eliminazione
    const confirmAndRemove = () => {
        if (taskToDeleteId) {
            handleRemoveClick(taskToDeleteId);
            closeConfirmModal();
        }
    };

    return (
        <>
            {
                tasks.length > 0 ? (tasks.map(task => {
                    return (
                        <div className="col" key={task.id}>
                            <div className="card mx-auto my-2 p-3 h-100" style={{ maxWidth: '900px' }}>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <p className="m-0"><strong>Task </strong>{task.title}</p>
                                    <button className="btn btn-outline-warning btn-sm" onClick={() => handleUpdateTask(task)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <p className="m-0"><strong>Descrizione </strong> {task.description}</p>
                                    <button className="btn btn-outline-warning btn-sm" onClick={() => handleUpdateTask(task)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <p className="m-0">
                                        <strong>Scadenza </strong> {formatItalian(task.due_date)}
                                    </p>
                                    <button className="btn btn-outline-warning btn-sm" onClick={() => handleUpdateTask(task)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-outline-success btn-sm" onClick={() => handleSuccessClick(task.id)}>
                                        <i className="bi bi-check2-square"></i>
                                    </button>
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => openConfirmModal(task.id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })) : (
                    <h3 className="my-5 mx-auto text-center">
                        Nessuna Task da completare, creane una.
                    </h3>
                )
            }

            {/* Inserisci il componente modale alla fine */}
            <ConfirmationModal
                show={showModal}
                onClose={closeConfirmModal}
                onConfirm={confirmAndRemove}
            />
        </>
    )
}