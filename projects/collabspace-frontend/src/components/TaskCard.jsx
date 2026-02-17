import React from "react";

const TaskCard = ({ task }) => (
  <div className="task-card">
    <h4>{task.title}</h4>
    <p>Assigned to: {task.assignedUser?.name || "Unassigned"}</p>
    <p>Status: {task.status}</p>
  </div>
);

export default TaskCard;
