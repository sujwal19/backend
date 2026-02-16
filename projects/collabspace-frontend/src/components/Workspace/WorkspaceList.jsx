import { useEffect, useState } from "react";
import API from "../../utils/api";

export default function WorkspaceList() {
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    API.get("/workspaces").then((res) => setWorkspaces(res.data));
  }, []);

  return (
    <div>
      <h2>Your Workspaces</h2>
      {workspaces.map((ws) => (
        <div key={ws._id}>
          <h3>{ws.name}</h3>
          <p>{ws.description}</p>
          <p>Members: {ws.members.map((m) => m.name).join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
