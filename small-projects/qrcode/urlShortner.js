const http = require("http");

const urls = {}; // storage
const PORT = 3000;

function shortCode() {
  return Math.random().toString(36).slice(2, 8);
}

http
  .createServer((req, res) => {
    // create short url
    if (req.url.startsWith("/shorten?")) {
      const longUrl = req.url.split("url=")[1];
      const code = shortCode();
      urls[code] = decodeURIComponent(longUrl);

      res.end(`Short URL: http://localhost:${PORT}/${code}`);
      return;
    }

    // redirect
    const code = req.url.slice(1);
    if (urls[code]) {
      res.writeHead(302, { Location: urls[code] });
      res.end();
    } else {
      res.end("Not found");
    }
  })
  .listen(PORT);

console.log("Server running on port 3000");
