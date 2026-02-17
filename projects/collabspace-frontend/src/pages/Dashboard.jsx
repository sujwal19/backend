import React, { useEffect, useState } from "react";
import { getWorkspaces } from "../api/api";
import WorkspaceCard from "../components/WorkspaceCard";

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getWorkspaces();
      setWorkspaces(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Workspaces</h2>
      {workspaces.map((ws) => (
        <WorkspaceCard key={ws._id} workspace={ws} />
      ))}
    </div>
  );
};

export default Dashboard;
