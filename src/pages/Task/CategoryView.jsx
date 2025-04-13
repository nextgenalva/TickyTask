import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskList from './TaskList';

const CategoryView = ({ categoryName, isGroup = false }) => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Read a book 📚", time: "08:00 - 09:00", category: "List of Books" },
        { id: 2, title: "Wireframing new product", time: "09:00 - 11:00", category: "Work" },
        { id: 3, title: "Moodboard Landing Page", tag: "# Mobal Project", time: "11:00 - 13:00", users: ["user1", "user2"], category: "Work", project: "Mobal Project" },
        { id: 4, title: "Weekly meeting", tag: "# Futur Project", time: "13:00 - 14:00", users: ["user1", "user2", "user3"], category: "Work", project: "Futur Project" },
        { id: 5, title: "Design PPT for Sharing Session #2", time: "14:00 - 16:00", category: "Work" },
        { id: 6, title: "Ngopi with Bojo", time: "17:00 - 18:30", category: "Personal" },
        { id: 7, title: "Gym session", time: "19:00 - 20:00", category: "Diet" },
        { id: 8, title: "Plan road trip to mountains", time: "20:00 - 21:00", category: "Road Trip List" },
        { id: 9, title: "Finish novel chapter", time: "21:00 - 22:00", category: "Completed" },
    ]);

    // Filter tasks based on the category or project
    const filteredTasks = isGroup
        ? tasks.filter(task => task.project === categoryName)
        : tasks.filter(task => task.category === categoryName);

    const handleAddTask = (newTask) => {
        // Add the category to the new task
        const taskWithCategory = {
            ...newTask,
            category: isGroup ? "Work" : categoryName,
            ...(isGroup && { project: categoryName, tag: `# ${categoryName}` })
        };

        setTasks(prevTasks => [...prevTasks, taskWithCategory]);
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">{categoryName}</h1>
                <p className="text-gray-500">
                    {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} in this {isGroup ? 'project' : 'category'}
                </p>
            </div>

            <div className="mt-8">
                <TaskList tasks={filteredTasks} onAddTask={handleAddTask} />
            </div>
        </div>
    );
};

export default CategoryView;