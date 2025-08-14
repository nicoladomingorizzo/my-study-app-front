import { useState, useEffect } from "react";
import CompletedTasks from "./CompletedTasks";
import DeleteMessage from "./DeleteMessage";
import SuccessMessage from "./SuccessMessage";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import UnsuccessMessage from "./UnsuccessMessage";

export default function AppMain() {

    // useState for Tasks
    const [tasks, setTasks] = useState([]);

    //useStates for Alerts
    const [unsuccessMessage, setUnsuccessMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');

    // useState for Update Task
    const [editingTaskId, setEditingTaskId] = useState(null);

    // useStates for TaskForm
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Const to backend route
    const apiUrl = `http://127.0.0.1:3030/api/tasks`;

    const completedTasksList = tasks.filter(task => task.completed);

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setTasks(data);
            })
    }, []);

    // function for transform date to local (Italian) date
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
        setDeleteMessage('Task eliminata con successo!')
    };

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
                setUnsuccessMessage('Task riportata allo stato di non completata!');
            })
            .catch(err => console.error('Errore nel completamento della task:', err));
    };

    function handleUpdateTask(task) {
        setEditingTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.due_date?.split("T")[0] || ''); // Rimuove l'ora, lascia solo yyyy-mm-dd
    };

    //function to fetch
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

    //setTimeouts for alerts
    useEffect(() => {
        if (successMessage) {
            const timeout = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [successMessage]);

    useEffect(() => {
        if (unsuccessMessage) {
            const timeout = setTimeout(() => {
                setUnsuccessMessage('');
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [unsuccessMessage]);

    useEffect(() => {
        if (deleteMessage) {
            const timeout = setTimeout(() => {
                setDeleteMessage('');
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [deleteMessage]);

    return (
        <>

            <div className="container py-4">
                {/* Component for Alert Message to Delete Task */}
                <DeleteMessage deleteMessage={deleteMessage} />

                {/* Component for Alert Message to Unsuccess Task */}
                <UnsuccessMessage unsuccessMessage={unsuccessMessage} />

                {/* Component for Alert Message to Success Task */}
                <SuccessMessage successMessage={successMessage} />

                {/* Cards Settings to row and cols */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    <TaskCard handleRemoveClick={handleRemoveClick} handleUpdateTask={handleUpdateTask} formatItalian={formatItalian} tasks={tasks.filter(task => !task.completed)} handleSuccessClick={handleSuccessClick} />
                </div>
            </div>

            {/* Section for TaskForm */}
            <section className="sticky-bottom bg-white pt-3 pb-4 border-top shadow-sm bg-body-tertiary">
                <TaskForm editingTaskId={editingTaskId} title={title} setTitle={setTitle} description={description} setDescription={setDescription} dueDate={dueDate} setDueDate={setDueDate} handleSubmitCreate={handleSubmitCreate} handleSubmitUpdate={handleSubmitUpdate} />
            </section>

            {/* Section for CompletedTasks */}
            <section className="completed container">
                <CompletedTasks completedTasksList={completedTasksList} handleUnsuccessClick={handleUnsuccessClick} handleRemoveClick={handleRemoveClick} />
            </section>

        </>
    )

}