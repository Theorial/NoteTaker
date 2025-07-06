
function updateNote(id , newTitle, newBody){
  fetch(`/notes/${id}`, {
	method: "PATCH",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({ title: newTitle, content: newBody })
  })
  .then(res => res.json())
  .then(updatedNote => {
	const noteEl = document.querySelector(`.note[data-id="${id}"]`);
	noteEl.querySelector("h3").textContent = updatedNote.title;
	noteEl.querySelector("p").textContent = updatedNote.content;
  });
}

function saveNote(note){
  fetch("/submit", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(note)
  })
  .then(res => res.json())
  .then(newNote => {
	renderNotes([newNote], true);
  });
}

function renderNotes(notesArray, append = false) {
  const container = document.getElementById("notes-container");
  if (!append) container.innerHTML = "";
  notesArray.forEach(note => {
	const noteEl = document.createElement("div");
	noteEl.className = "note";
	noteEl.dataset.id = note.id;

	noteEl.innerHTML = `
	  <h3>${note.title}</h3>
	  <p>${note.content}</p>
	  <div class="note-actions">
		<button class="edit-btn">Edit</button>
		<button class="delete-btn">Delete</button>
	  </div>
	`;

	noteEl.querySelector(".delete-btn").addEventListener("click", async () => {
	  await fetch(`/notes/${note.id}`, { method: "DELETE" });
	  noteEl.remove();
	});

	noteEl.querySelector(".edit-btn").addEventListener("click", () => {
	  const newTitle = prompt("New title:", note.title);
	  const newContent = prompt("New content:", note.content);
	  if (newTitle !== null && newContent !== null) {
		updatedNote(note.id, newTitle, newContent);
	  }
	});

	container.appendChild(noteEl);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("note-form");

  fetch("/notes")
	.then(res => res.json())
	.then(renderNotes);

  form.addEventListener("submit", (e) => {
	e.preventDefault();
	const title = document.getElementById("note-title").value;
	const content = document.getElementById("note-body").value;
	fetch("/submit", {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({ title, content })
	})
	.then(res => res.json())
	.then(newNote => {
	  renderNotes([newNote], true);
	  form.reset();
	});
  });
});
