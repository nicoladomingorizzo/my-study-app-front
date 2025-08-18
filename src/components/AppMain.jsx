import CompletedTasks from "./CompletedTasks";
import DeleteMessage from "./DeleteMessage";
import SuccessMessage from "./SuccessMessage";
import TaskCard from "./TaskCard";
import UnsuccessMessage from "./UnsuccessMessage";

export default function AppMain({ tasks, completedTasksList, handleRemoveClick, handleUpdateTask, handleSuccessClick, handleUnsuccessClick, successMessage, unsuccessMessage, deleteMessage }) {
    // Format italiano per date
    function formatItalian(string) {
        if (!string) return "Data non disponibile";
        const dateObject = new Date(string);
        if (isNaN(dateObject)) return "Formato data non valido";
        return dateObject.toLocaleDateString("it-IT");
    }

    return (
        <>
            <div className="container py-4">
                {/* Alerts */}
                <DeleteMessage deleteMessage={deleteMessage} />
                <UnsuccessMessage unsuccessMessage={unsuccessMessage} />
                <SuccessMessage successMessage={successMessage} />

                {/* Tasks non completate */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    <TaskCard
                        tasks={tasks.filter((task) => !task.completed)}
                        handleRemoveClick={handleRemoveClick}
                        handleUpdateTask={handleUpdateTask}
                        handleSuccessClick={handleSuccessClick}
                        formatItalian={formatItalian}
                    />
                </div>
            </div>

            {/* Tasks completate */}
            <section className="completed container">
                <CompletedTasks completedTasksList={completedTasksList} handleUnsuccessClick={handleUnsuccessClick} handleRemoveClick={handleRemoveClick} />
            </section>
        </>
    );
}
