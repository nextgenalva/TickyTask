// pages/Dashboard.jsx

import Sidebar from "./Sidebar";
import TaskInputModal from "./TaskInputModal";
import TaskList from "./TaskList";
import Topbar from "./Topbar";


const Dashboard = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
                <Topbar />
                <TaskInputModal />
                <TaskList />
            </main>
        </div>
    );
};

export default Dashboard;
