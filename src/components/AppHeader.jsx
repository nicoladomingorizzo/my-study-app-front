import TaskForm from "./TaskForm";

export default function AppHeader({ editingTaskId, title, setTitle, description, setDescription, dueDate, setDueDate, handleSubmitCreate, handleSubmitUpdate, handleEraseUpdateTask }) {
    return (
        <div className="bg-body-tertiary py-5">
            <div className="container text-center">
                <h1>Tasks List</h1>
                <p>by Nicola Rizzo</p>

                {/* TaskForm integrato nell'header */}
                <div className="mt-4">
                    <TaskForm editingTaskId={editingTaskId} title={title} setTitle={setTitle} description={description} setDescription={setDescription} dueDate={dueDate} setDueDate={setDueDate} handleSubmitCreate={handleSubmitCreate} handleSubmitUpdate={handleSubmitUpdate} handleEraseUpdateTask={handleEraseUpdateTask} />
                </div>
            </div>
        </div>
    );
}
