import React from "react";
import { Link } from "react-router-dom";

const WorkspaceCard = ({ workspace }) => (
  <div className="workspace-card">
    <h3>{workspace.name}</h3>
    <p>{workspace.description}</p>
    <Link to={`/workspace/${workspace._id}`}>Enter</Link>
  </div>
);

export default WorkspaceCard;
