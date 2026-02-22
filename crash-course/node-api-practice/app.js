import { logger } from "./middlewares/logger.js";
import { parse } from "url";
import { todoRoutes } from "./routes/todoRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// 2️⃣ app.js – App Layer / Middleware / Dispatcher
// Purpose: Global middleware + CORS + error handling
//  + route dispatcher

// app(req, res)
//   ├─ set CORS headers
//   ├─ OPTIONS preflight? → end
//   ├─ logger(req)
//   ├─ parse URL & query params
//   ├─ call todoRoutes(req, res, parsedUrl, query)
//   └─ catch error → errorHandler(err, req, res)

export const app = async (req, res) => {
  try {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

    // Handle preflight
    if (req.method === "OPTIONS") {
      res.writeHead(204);
      return res.end();
    }

    // Logger Middleware
    logger(req);

    // Parse URL & query
    const parsedUrl = parse(req.url, true);
    const query = parsedUrl.query;

    // Route dispatch
    await todoRoutes(req, res, parsedUrl, query);
    //
  } catch (err) {
    errorHandler(err, req, res);
  }
};
