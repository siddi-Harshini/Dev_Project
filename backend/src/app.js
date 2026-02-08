const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notesRoutes = require("./routes/notes");
const bookmarksRoutes = require("./routes/bookmarks");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "notes-bookmarks-api" });
});

app.use("/api/notes", notesRoutes);
app.use("/api/bookmarks", bookmarksRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

module.exports = app;
