import { useState, useEffect } from "react"

export default function AppMain() {

    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')

    const apiUrl = `http://127.0.0.1:3030/api/tasks`
    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setTasks(data)
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

        if (!name || !description || !dueDate) {
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
            })
            .catch(error => console.error('Errore:', error));
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {tasks.map(task => {
                            return (
                                <div className="card mx-auto d-flex flex-row justify-content-between align-items-center my-2 px-5" key={task.id}>
                                    <div className="card-top py-2 px-2">
                                        <h3><b>Task: </b>{task.title}</h3>
                                    </div>
                                    <div className="description pt-3 px-2">
                                        <p><b>Descrizione Task: </b>{task.description}</p>
                                    </div>
                                    <div className="due_date pt-3 px-2">
                                        <p><b>Tempo Massimo per utlimare la task: </b>
                                            {formatItalian(task.due_date)}</p>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    <div className="col">
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
                    </div>
                </div>
            </div>
        </>
    )

}