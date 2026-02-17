import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
  withCredentials: true, // for HTTP-only cookies
});

export const login = (data) => API.post("/auth/login", data);
export const signup = (data) => API.post("/auth/signup", data);
export const getWorkspaces = () => API.get("/workspaces");
export const createWorkspace = (data) => API.post("/workspaces", data);
export const getProjects = (workspaceId) => API.get(`/projects/${workspaceId}`);
export const createProject = (data) => API.post("/projects", data);
export const getTasks = (projectId) => API.get(`/tasks/${projectId}`);
export const createTask = (data) => API.post("/tasks", data);
export const inviteMember = (workspaceId, email) =>
  API.post(`/workspaces/invite/${workspaceId}`, { email });
export const getUsers = () => API.get("/users"); // admin
