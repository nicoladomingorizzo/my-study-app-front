import { useState, useEffect } from "react";

export default function AppMain() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const apiUrl = `http://127.0.0.1:3030/api/tasks`;

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setTasks(data);
            })
    }, []);

    function formatItalian(string) {
        if (!string) return 'Data non disponibile';
        // Converti la stringa in un oggetto Date
        const dateObject = new Date(string);
        // Controlla se la data è valida prima di formattarla
        if (isNaN(dateObject)) return 'Formato data non valido';
        // Usa toLocaleDateString() sull'oggetto Date
        return dateObject.toLocaleDateString("it-IT");
    };


    function handleSubmitCreate(e) {
        e.preventDefault();

        if (!title || !description || !dueDate) {
            alert('Per favore compila tutti i campi');
            return;
        }

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, due_date: dueDate })
        })
            .then(res => res.json())
            .then(newTask => {
                setTasks(prevTasks => [...prevTasks, newTask]);
                setTitle('');
                setDescription('');
                setDueDate('');
                setSuccessMessage('Task aggiunta con successo!');
            })
            .catch(error => console.error('Errore:', error));
    };

    function handleSubmitUpdate(e) {
        e.preventDefault();

        if (!title || !description || !dueDate) {
            alert('Per favore compila tutti i campi');
            return;
        }

        fetch(`${apiUrl}/${editingTaskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, due_date: dueDate })
        })
            .then(res => res.json())
            .then(() => {
                setTasks(prev => prev.map(task =>
                    task.id === editingTaskId
                        ? { ...task, title, description, due_date: dueDate }
                        : task
                ))
                setTitle('');
                setDescription('');
                setDueDate('');
                setEditingTaskId(null);
                setSuccessMessage('Task modificata con successo!');
            })
            .catch(error => console.error('Errore:', error));
    };

    function handleRemoveClick(id) {
        fetch(`http://127.0.0.1:3030/api/tasks/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.status === 204) {
                    // Rimuovi dal DOM solo se il server ha eliminato
                    setTasks(prev => prev.filter(task => task.id !== id));
                } else {
                    alert('Errore durante l\'eliminazione');
                }
            })
            .catch(err => console.error('Errore DELETE:', err));
    };

    function handleUpdateTask(task) {
        setEditingTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.due_date?.split("T")[0] || ''); // Rimuove l'ora, lascia solo yyyy-mm-dd
    };

    useEffect(() => {
        if (successMessage) {
            const timeout = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [successMessage]);

    return (
        <>
            <div className="container py-4">
                {successMessage && (
                    <div className="alert alert-success mt-3 w-75 mx-auto" role="alert">
                        {successMessage}
                    </div>
                )}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {tasks.length > 0 ? (tasks.map(task => {
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
                                    <div className="text-end">
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
                </div>
            </div>
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
                                onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div className="col-12 col-md-3">
                            <input
                                className="text-center p-3 form-control"
                                type="date"
                                value={dueDate}
                                placeholder="Inserisci una data di scadenza"
                                onChange={e => setDueDate(e.target.value)} />
                        </div>
                        <div className="col-12 col-md-2 d-grid">
                            <button className="btn btn-outline-dark bg-white text-dark p-3 w-100">
                                <i className="bi bi-send pe-2"></i>
                                {editingTaskId ? 'Aggiorna' : 'Invia'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )

}