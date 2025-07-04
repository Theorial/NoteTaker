document.addEventListener("DOMContentLoaded", loadNotes);
const form = document.getElementById("note-form");
const notesContainer = document.getElementById("notes-container");
let isEditing = false;
let editingNoteId = null;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("note-title").value.trim();
  const body = document.getElementById("note-body").value.trim();

  if (!title || !body) return;

  if (isEditing) {
    updateNote(editingNoteId, title, body);
    isEditing = false;
    editingNoteId = null;
  } else {
    const note = {
      id: Date.now().toString(),
      title,
      body,
    };
    saveNote(note);
    renderNote(note);
  }

  form.reset();
  notesContainer.innerHTML = "";
  loadNotes(); 
});


function updateNote(id, newTitle, newBody) {
  const notes = getNotes().map((note) => {
    if (note.id === id) {
      return { ...note, title: newTitle, body: newBody };
    }
    return note;
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}


function saveNote(note) {
  const notes = getNotes();
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

function loadNotes() {
  const notes = getNotes();
  notes.forEach(renderNote);
}

function renderNote(note) {
  const noteEl = document.createElement("div");
  noteEl.className = "note";
  noteEl.innerHTML = `
    <div class="note-title">${note.title}</div>
    <div class="note-body">${note.body}</div>
    <button class="delete-btn" data-id="${note.id}">Delete</button>
    <button class="edit-btn" data-id="${note.id}">Edit</button>
`;

noteEl.querySelector(".edit-btn").addEventListener("click", function () {
  document.getElementById("note-title").value = note.title;
  document.getElementById("note-body").value = note.body;
  isEditing = true;
  editingNoteId = note.id;
});

  noteEl.querySelector(".delete-btn").addEventListener("click", function () {
    deleteNote(note.id);
    noteEl.remove();
  });

  notesContainer.appendChild(noteEl);
}

function deleteNote(id) {
  const notes = getNotes().filter((n) => n.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes));
}