import jsonServer from "json-server";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname issue in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const router = jsonServer.router("db.json"); // Correct way to get router
const middlewares = jsonServer.defaults();  // Correct way to get defaults

// Serve React build folder
server.use(express.static(path.join(__dirname, "dist")));

server.use(middlewares);
server.use("/api", router); // JSON Server runs at `/api`

// Serve React app on all routes
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
