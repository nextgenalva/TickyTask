import TaskCard from "./TaskCard";

const TaskList = () => {
    const tasks = [
        { title: "Read a book 📚", time: "08:00 - 09:00" },
        { title: "Wireframing new product", time: "09:00 - 11:00" },
        // Add more...
    ];

    return (
        <div className="space-y-3 mt-4">
            {tasks.map((task, idx) => (
                <TaskCard key={idx} {...task} />
            ))}
        </div>
    );
};

export default TaskList;