import http from "http";
import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";

// Load env + Start Server

const server = http.createServer(app);

//
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
