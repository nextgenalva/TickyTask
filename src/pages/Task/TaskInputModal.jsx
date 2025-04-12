import React from 'react';

const TaskInputModal = () => {
    return (
        <>
            <button className="btn btn-primary" onClick={() => document.getElementById('task_modal').showModal()}>+ Create new task</button>
            <dialog id="task_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Task</h3>
                    <input type="text" placeholder="Task title" className="input input-bordered w-full mt-3" />
                    <textarea className="textarea textarea-bordered w-full mt-2" placeholder="Add notes"></textarea>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default TaskInputModal;