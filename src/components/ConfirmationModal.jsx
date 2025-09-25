import React from 'react';

export default function ConfirmationModal({ show, onClose, onConfirm }) {

    // Non renderizza nulla se la prop 'show' è false
    if (!show) {
        return null;
    }

    return (
        <div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={onClose}
        >
            <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Conferma Eliminazione Task</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>Sei sicuro di voler **eliminare definitivamente** questa task? L'azione è irreversibile.</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Annulla
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onConfirm}
                        >
                            <i className="bi bi-trash me-2"></i> Elimina
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}