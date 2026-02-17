import { useState } from "react";
import WorkspaceList from "../components/Workspace/WorkspaceList";
import WorkspaceDetail from "../components/Workspace/WorkspaceDetail";
import ProjectView from "./ProjectView";

export default function Dashboard() {
  // Track which workspace is selected
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  // Track which project is selected
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Step 1: Show WorkspaceList if no workspace selected */}
      {!selectedWorkspace && (
        <WorkspaceList
          onSelectWorkspace={(workspaceId) => {
            setSelectedWorkspace(workspaceId);
          }}
        />
      )}

      {/* Step 2: Show WorkspaceDetail if a workspace is selected */}
      {selectedWorkspace && !selectedProject && (
        <WorkspaceDetail
          workspaceId={selectedWorkspace}
          onSelectProject={(projectId) => setSelectedProject(projectId)}
        />
      )}

      {/* Step 3: Show ProjectView if a project is selected */}
      {selectedProject && <ProjectView projectId={selectedProject} />}
    </div>
  );
}
