import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjects } from "../api/api";
import TaskCard from "../components/TaskCard";

const Workspace = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getProjects(id);
      setProjects(res.data);
    };
    fetchProjects();
  }, [id]);

  return (
    <div>
      <h2>Projects</h2>
      {projects.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          {p.tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Workspace;
