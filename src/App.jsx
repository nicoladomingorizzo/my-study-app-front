import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";

function App() {

  return (
    <>

      <AppHeader editingTaskId={editingTaskId} title={title} setTitle={setTitle} description={description} setDescription={setDescription} dueDate={dueDate} setDueDate={setDueDate} handleSubmitCreate={handleSubmitCreate} handleSubmitUpdate={handleSubmitUpdate} handleEraseUpdateTask={handleEraseUpdateTask} />

      <AppMain tasks={tasks} setTasks={setTasks} editingTaskId={editingTaskId} setEditingTaskId={setEditingTaskId} setTitle={setTitle} setDescription={setDescription} setDueDate={setDueDate} />

    </>
  )
}

export default App
