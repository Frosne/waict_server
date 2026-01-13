const http = require("http");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "public");

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

function contentType(p) {
  if (p.endsWith(".html")) return "text/html; charset=utf-8";
  if (p.endsWith(".json")) return "application/json; charset=utf-8";
  if (p.endsWith(".png")) return "image/png";
  return "application/octet-stream";
}

const server = http.createServer((req, res) => {
  const urlPath = (req.url || "/").split("?")[0];
  const mapped = urlPath === "/" ? "/index.html" : urlPath;
  const filePath = path.join(PUBLIC_DIR, mapped);

  res.setHeader("Integrity-Policy", "script");

  // AW: really not sure
  const waictRequested = req.headers["sec-ch-waict"];

  // if (waictRequested && waictRequested.includes("1")) {
    res.setHeader(
      "Sec-WAICT-v1-Enforce",
      'max-age=60, mode="audit", preload=?0, manifest=/waict-manifest.json'
    );

    // res.setHeader("Sec-WAICT-v1-Manifest", "/waict-manifest.json");
  // }

  // if (waictRequested && waictRequested.includes("2")) {
  //   console.log("Client offered WAICT v2 but server only supports v1");
  // }

  // Prevent path traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Bad path");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Not found");
    }
    res.writeHead(200, { "Content-Type": contentType(filePath) });
    res.end(data);
  });
});

server.listen(8080, () => {
  console.log("Listening on http://localhost:8080");
});

