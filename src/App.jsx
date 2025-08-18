import { useState, useEffect } from "react";
import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";
import { supabase } from "./supabaseClient";

export default function App() {
  // State per le tasks
  const [tasks, setTasks] = useState([]);

  // State per alert messages
  const [unsuccessMessage, setUnsuccessMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  // State per Update Task
  const [editingTaskId, setEditingTaskId] = useState(null);

  // State per TaskForm
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const completedTasksList = tasks.filter((task) => task.completed);

  useEffect(() => {
    async function fetchTasks() {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      if (error) {
        console.error("Errore caricamento:", error);
      } else {
        setTasks(data);
      }
    }
    fetchTasks();
  }, []);

  async function handleRemoveClick(id) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error("Errore DELETE:", error);
    } else {
      setTasks((prev) => prev.filter((task) => task.id !== id));
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
      setTasks((prev) => prev.map((task) => (task.id === id ? data[0] : task)));
      handleEraseUpdateTask();
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
      setTasks((prev) => prev.map((task) => (task.id === id ? data[0] : task)));
      setUnsuccessMessage("Task riportata a non completata!");
    }
  }

  function handleUpdateTask(task) {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.due_date?.split("T")[0] || "");
  }

  function handleEraseUpdateTask() {
    setEditingTaskId(null);
    setTitle("");
    setDescription("");
    setDueDate("");
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
      setTasks((prev) => [...prev, ...data]);
      handleEraseUpdateTask();
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
      setTasks((prev) =>
        prev.map((task) => (task.id === editingTaskId ? data[0] : task))
      );
      handleEraseUpdateTask();
      setSuccessMessage("Task modificata con successo!");
    }
  }

  // Timeout per alerts
  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  useEffect(() => {
    if (unsuccessMessage) {
      const timeout = setTimeout(() => setUnsuccessMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [unsuccessMessage]);

  useEffect(() => {
    if (deleteMessage) {
      const timeout = setTimeout(() => setDeleteMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [deleteMessage]);

  return (
    <>
      <AppHeader editingTaskId={editingTaskId} title={title} setTitle={setTitle} description={description} setDescription={setDescription} dueDate={dueDate} setDueDate={setDueDate} handleSubmitCreate={handleSubmitCreate} handleSubmitUpdate={handleSubmitUpdate} handleEraseUpdateTask={handleEraseUpdateTask} />

      <AppMain tasks={tasks} completedTasksList={completedTasksList} handleRemoveClick={handleRemoveClick} handleUpdateTask={handleUpdateTask} handleSuccessClick={handleSuccessClick} handleUnsuccessClick={handleUnsuccessClick} successMessage={successMessage} unsuccessMessage={unsuccessMessage} deleteMessage={deleteMessage} />
    </>
  );
}
