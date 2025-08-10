import { useState, useEffect } from "react";

export default function AppMain() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
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


    function handleSubmitTask(e) {
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
            })
            .catch(error => console.error('Errore:', error));
    }

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
    }


    return (
        <>
            <div className="container py-4">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {tasks.map(task => {
                        return (
                            <div className="col" key={task.id}>
                                <div className="card mx-auto my-2 p-3" style={{ maxWidth: '900px' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <p className="m-0"><strong>Task:</strong>{task.title}</p>
                                        <button className="btn btn-outline-warning btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <p className="m-0"><strong>Descrizione:</strong> {task.description}</p>
                                        <button className="btn btn-outline-warning btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <p className="m-0">
                                            <strong>Scadenza:</strong> {formatItalian(task.due_date)}
                                        </p>
                                        <button className="btn btn-outline-warning btn-sm">
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
                    })}
                </div>
                <section className="sticky-bottom bg-white pt-3 pb-4 border-top shadow-sm">
                    <form onSubmit={handleSubmitTask} className="d-flex justify-content-between gap-2">
                        <input
                            className=" w-25 text-center p-3"
                            type="text"
                            value={title}
                            placeholder="Inserisci una nuova task..."
                            onChange={e => setTitle(e.target.value)} />
                        <input
                            className=" w-50 text-center p-3"
                            type="text"
                            value={description}
                            placeholder="Inserisci una descrizione della task..."
                            onChange={e => setDescription(e.target.value)} />
                        <input
                            className=" text-center p-3"
                            type="date"
                            value={dueDate}
                            placeholder="Inserisci una data di scadenza"
                            onChange={e => setDueDate(e.target.value)} />
                        <button className="btn btn-outline-dark"><i className="bi bi-send pe-2"></i>Invia</button>
                    </form>
                </section>
            </div>
        </>
    )

}