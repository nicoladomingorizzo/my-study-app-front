import { useState, useEffect } from "react";
import CompletedTasks from "./CompletedTasks";
import DeleteMessage from "./DeleteMessage";
import SuccessMessage from "./SuccessMessage";
import TaskCard from "./TaskCard";
import UnsuccessMessage from "./UnsuccessMessage";
import { supabase } from "../supabaseClient";

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

    const completedTasksList = tasks.filter(task => task.completed);

    useEffect(() => {
        async function fetchTasks() {
            const { data, error } = await supabase.from("tasks").select("*").order("id", { ascending: false });
            if (error) {
                console.error("Errore caricamento:", error);
            } else {
                setTasks(data);
            }
        }
        fetchTasks();
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

    async function handleRemoveClick(id) {
        const { error } = await supabase.from("tasks").delete().eq("id", id);
        if (error) {
            console.error("Errore DELETE:", error);
        } else {
            setTasks(prev => prev.filter(task => task.id !== id));
            setDeleteMessage("Task eliminata con successo!");
        }
    }

    async function handleSuccessClick(id) {
        const { data, error } = await supabase
            .from("tasks")
            .update({ completed: true })
            .eq("id", id)
            .select();

        if (error) {
            console.error("Errore update:", error);
        } else {
            setTasks(prev => prev.map(task => task.id === id ? data[0] : task));
            setEditingTaskId(null);
            setTitle("");
            setDescription("");
            setDueDate("");
            setSuccessMessage("Task completata con successo!");
        }
    }

    async function handleUnsuccessClick(id) {
        const { data, error } = await supabase
            .from("tasks")
            .update({ completed: false })
            .eq("id", id)
            .select();

        if (error) {
            console.error("Errore update:", error);
        } else {
            setTasks(prev => prev.map(task => task.id === id ? data[0] : task));
            setUnsuccessMessage("Task riportata a non completata!");
        }
    }


    function handleUpdateTask(task) {
        setEditingTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.due_date?.split("T")[0] || ''); // Rimuove l'ora, lascia solo yyyy-mm-dd
    };

    function handleEraseUpdateTask() {
        setEditingTaskId(null);
        setTitle('');
        setDescription('');
        setDueDate('');
    }

    async function handleSubmitCreate(e) {
        e.preventDefault();

        if (!title || !description || !dueDate) {
            alert("Per favore compila tutti i campi");
            return;
        }

        const { data, error } = await supabase
            .from("tasks")
            .insert([{ title, description, due_date: dueDate, completed: false }])
            .select();

        if (error) {
            console.error("Errore insert:", error);
        } else {
            setTasks(prev => [...prev, ...data]);
            setTitle("");
            setDescription("");
            setDueDate("");
            setSuccessMessage("Task aggiunta con successo!");
        }
    }


    async function handleSubmitUpdate(e) {
        e.preventDefault();

        if (!title || !description || !dueDate) {
            alert("Per favore compila tutti i campi");
            return;
        }

        const { data, error } = await supabase
            .from("tasks")
            .update({ title, description, due_date: dueDate })
            .eq("id", editingTaskId)
            .select();

        if (error) {
            console.error("Errore update:", error);
        } else {
            setTasks(prev => prev.map(task =>
                task.id === editingTaskId ? data[0] : task
            ));
            setTitle("");
            setDescription("");
            setDueDate("");
            setEditingTaskId(null);
            setSuccessMessage("Task modificata con successo!");
        }
    }


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
                {/* Messaggi */}
                <DeleteMessage deleteMessage={deleteMessage} />
                <UnsuccessMessage unsuccessMessage={unsuccessMessage} />
                <SuccessMessage successMessage={successMessage} />

                {/* Tasks da completare */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    <TaskCard handleRemoveClick={handleRemoveClick} handleUpdateTask={handleUpdateTask} formatItalian={formatItalian} tasks={tasks.filter((task) => !task.completed)} handleSuccessClick={handleSuccessClick} />
                </div>
            </div>

            {/* Tasks completate */}
            <section className="completed container">
                <CompletedTasks completedTasksList={completedTasksList} handleUnsuccessClick={handleUnsuccessClick} handleRemoveClick={handleRemoveClick} />
            </section>

        </>
    )

}