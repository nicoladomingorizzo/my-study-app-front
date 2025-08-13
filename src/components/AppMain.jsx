import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import SuccessMessage from "./SuccessMessage";

export default function AppMain() {

    const [tasks, setTasks] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const apiUrl = `http://127.0.0.1:3030/api/tasks`;

    const completedTasksList = tasks.filter(task => task.completed);

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

    function handleUnsuccessClick(id) {
        fetch(`${apiUrl}/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: false })
        })
            .then(res => res.json())
            .then(() => {
                setTasks(prev =>
                    prev.map(task =>
                        task.id === id ? { ...task, completed: false } : task
                    )
                );
                setSuccessMessage('Task riportata allo stato di non completata!');
            })
            .catch(err => console.error('Errore nel completamento della task:', err));
    }
    function handleSuccessClick(id) {
        fetch(`${apiUrl}/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: true })
        })
            .then(res => res.json())
            .then(() => {
                setTasks(prev =>
                    prev.map(task =>
                        task.id === id ? { ...task, completed: true } : task
                    )
                );
                setSuccessMessage('Task completata con successo!');
            })
            .catch(err => console.error('Errore nel completamento della task:', err));
    }

    function handleUpdateTask(task) {
        setEditingTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.due_date?.split("T")[0] || ''); // Rimuove l'ora, lascia solo yyyy-mm-dd
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
                <SuccessMessage successMessage={successMessage} />
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    <TaskCard handleRemoveClick={handleRemoveClick} handleUpdateTask={handleUpdateTask} formatItalian={formatItalian} tasks={tasks.filter(task => !task.completed)} handleSuccessClick={handleSuccessClick} />
                </div>
            </div>
            <TaskForm apiUrl={apiUrl} setTasks={setTasks} setSuccessMessage={setSuccessMessage} setEditingTaskId={setEditingTaskId} editingTaskId={editingTaskId} title={title} setTitle={setTitle} description={description} setDescription={setDescription} dueDate={dueDate} setDueDate={setDueDate} handleSubmitCreate={handleSubmitCreate} handleSubmitUpdate={handleSubmitUpdate} />
            <section className="completed container">
                <h2 className="text-center mt-5 mb-5">Task Completate</h2>
                <ul className="list-group list-group-flush list-unstyled">
                    {
                        completedTasksList.length > 0 ?
                            (
                                completedTasksList.map(completeTask => {
                                    return (
                                        <li key={completeTask.id} className="d-flex justify-content-between align-items-start">
                                            <p><b>Task Completata: </b>{completeTask.title}</p>
                                            <p><b>Descriszione Task: </b>{completeTask.description}</p>
                                            <div className="buttons">
                                                <button className="btn btn-outline-warning btn-sm me-1" onClick={() => handleUnsuccessClick(completeTask.id)}>
                                                    <i className="bi bi-check2-square"></i>
                                                </button>
                                                <button className="btn btn-outline-danger btn-sm ms-1" onClick={() => handleRemoveClick(completeTask.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </li>
                                    )
                                })
                            ) : (
                                <li>
                                    <p className="text-center fs-4">Nessuna task ancora completata</p>
                                </li>
                            )}
                </ul>
            </section>
        </>
    )

}