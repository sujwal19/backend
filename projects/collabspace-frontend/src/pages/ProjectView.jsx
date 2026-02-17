import React, { useEffect, useState } from "react";
import API from "../utils/api";

const ProjectView = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get(`/tasks/project/${projectId}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, [projectId]);

  const updateStatus = (taskId, newStatus) => {
    API.put(`/tasks/${taskId}`, { status: newStatus })
      .then(() => {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task,
          ),
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - Assigned to:{" "}
            {task.assignedTo?.name || "Unassigned"} - Status: {task.status}
            {/* Only assigned user or admin can update */}
            {(task.assignedTo?._id === user?._id || user?.role === "admin") && (
              <select
                value={task.status}
                onChange={(e) => updateStatus(task._id, e.target.value)}
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectView;
