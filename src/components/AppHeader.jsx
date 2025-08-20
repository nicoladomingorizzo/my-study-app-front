import TaskForm from "./TaskForm";

export default function AppHeader({ editingTaskId, title, setTitle, description, setDescription, dueDate, setDueDate, handleSubmitCreate, handleSubmitUpdate, handleEraseUpdateTask }) {
    return (
        <div className="bg-body-tertiary py-5">
            <div className="container text-center justify-content-around align-items-center d-flex ">
                <div className="Title">
                    <h1 className="mb-2">Tasks List</h1>
                    <p>by Nicola Rizzo</p>
                </div>

                {/* TaskForm integrato nell'header */}
                <div className="mt-2 buttons">
                    <TaskForm editingTaskId={editingTaskId} title={title} setTitle={setTitle} description={description} setDescription={setDescription} dueDate={dueDate} setDueDate={setDueDate} handleSubmitCreate={handleSubmitCreate} handleSubmitUpdate={handleSubmitUpdate} handleEraseUpdateTask={handleEraseUpdateTask} />
                    <button className="btn btn-outline-danger">
                        <i class="bi bi-trash"></i>
                        Elimina tutto
                    </button>
                </div>
            </div>
        </div>
    )
}
