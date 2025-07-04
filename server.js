import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid"; // install this with `npm install uuid`

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// In-memory storage (use DB later)
let notes = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.post("/submit", (req, res) => {
  const { Title, content } = req.body;
  const newNote = {
    id: uuidv4(),
    title: Title,
    content: content,
  };
  notes.push(newNote);
  res.json(newNote);
});

app.patch("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const note = notes.find((n) => n.id === id);
  if (note) {
    note.title = title;
    note.content = content;
    res.json(note);
  } else {
    res.status(404).send("Note not found");
  }
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  notes = notes.filter((note) => note.id !== id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});