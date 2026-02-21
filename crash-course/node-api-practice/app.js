import { logger } from "./middlewares/logger";
import { parse } from "url";
import { todoRoutes } from "./routes/todoRoutes";
import { errorHandler } from "./middlewares/errorHandler";

export const app = async () => {
  try {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS",
    );
    setHeader("Access-Control-Allow-Headers", "Content-Type", Authorization);

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      return res.end();
    }

    // Middleware example
    logger(req, res);

    // Parse URL & query
    const parsedUrl = parse(req.url, true);
    const query = parsedUrl.query;

    // Route dispatch
    await todoRoutes(req, res, parsedUrl, query);
  } catch (err) {
    errorHandler(err, req, res);
  }
};
