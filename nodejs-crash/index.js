// console.log(global);  // global object - setTimeout, setInterval
// console.log(process);  // process being run

// 1st
// import http from "http";
// import { tasks } from "./tasks.js";

// const server = http.createServer((req, res) => {
//   if (req.url === "/nodejs-crash/tasks.js" && req.method === "GET") {
//     res.writeHead(200, { "content-type": "application/json" });
//     res.end(JSON.stringify(tasks));
//   } else {
//     res.writeHead(404, { "content-type": "application/json" });
//     res.end(JSON.stringify({ message: "Not Found" }));
//   }
// });

// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

//

// 2nd

// import { getTasks }, { getTasksLength } from "./tasks.js";
// console.log("Random Number is", generateRandomNumber());
// console.log("Celcius is", celciusToFahrenheit(0));
// ................
// ................
// const { generateRandomNumber, celciusToFahrenheit } = require("./utils");
// console.log(getTasks());
// console.log("Post Length is:", getTasksLength());

//
