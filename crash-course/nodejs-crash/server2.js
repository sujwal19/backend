import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
  {
    id: 0,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  },
  {
    id: 1,
    title: "qui est esse",
  },
  {
    id: 2,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
  },
  {
    id: 3,
    title: "eum et est occaecati",
  },
  {
    id: 4,
    title: "nesciunt quas odio",
  },
  {
    id: 5,
    title: "cersour eso doe osho",
  },
  {
    id: 6,
    title: "dolorem eum magni eos aperiam quia",
  },
  {
    id: 7,
    title: "magnam facilis autem",
  },
  {
    id: 8,
    title: "dolorem dolore est ipsam",
  },
  {
    id: 9,
    title: "nesciunt iure omnis dolorem tempora et accusantium",
  },
  {
    id: 10,
    title: "optio molestias id quia eum",
  },
  {
    id: 11,
    title: "et ea vero quia laudantium autem",
  },
];

// Logger Middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// JSON Middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("content-type", "application/json");
  next();
};

// Route handler for GET /api/users
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

// Route handler for GET /api/users/:id
const getUsersByIdHandler = (req, res) => {
  const id = req.url.split("/")[3];
  const user = users.find((user) => user.id === parseInt(id));
  if (user) {
    res.write(JSON.stringify(users[id]));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User not Found" }));
  }
  res.end();
};

// Router handler for POST /api/users
const createUserHandler = (req, res) => {
  let body = "";
  // Listen for data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    res.end();
  });
};

// Not Found Handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Route not Found" }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url == "/api/users" && req.method === "GET") {
        getUsersHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getUsersByIdHandler(req, res);
      } else if (req.url === "/api/users" && req.method === "POST") {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
