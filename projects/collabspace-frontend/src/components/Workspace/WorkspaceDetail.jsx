import { useState } from "react";
import API from "../../utils/api";
import { useEffect } from "react";
import Project from "../../../../collabspace/models/Project";

const WorkspaceDetail = () => {
  const [projects, setProjects] = useState([]);

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get(`/projects/workspaces/${workspaceId}`)
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, [workspaceId]);

  return (
    <div>
      <h2>Projects</h2>
      {user?.role === "admin" && (
        <button onClick={() => alert("Show create project form")}>
          Create Project
        </button>
      )}

      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => onSelectProject(project._id)}
            >
              {Project.name}
            </span>
            <span>
              {" "}
              -Members: {project.members.map((m) => m.name).join(", ")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkspaceDetail;
