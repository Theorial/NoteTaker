import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res, next) => {
  console.log(Object.values(req.body));
  res.redirect("/"); // Redirect back to the main page after submission
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/api/notes", (req, res) => {
  // This is a placeholder for the notes API endpoint
  res.json({ message: "This is the notes API endpoint" });
});
app.post("/api/notes", (req, res) => {
  // This is a placeholder for the notes API endpoint
  console.log(req.body);
  res.json({ message: "Note created successfully" });
});
