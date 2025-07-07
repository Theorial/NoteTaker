const saveBtn = document.querySelector(".savebtn");
const deleteBtn = document.querySelector(".deletebtn");
const textArea = document.querySelector(".text");
const titleInput = document.querySelector(".titlet");
const notesList = document.querySelector(".savenotes-container ul");

let selectedIdx = null;

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  notesList.innerHTML = notes
    .map(
      (note, idx) => `
        <div data-idx="${idx}" class="note-box${selectedIdx == idx ? ' selected' : ''}">
          <strong>${note.title}</strong>
        </div>
      `
    )
    .join("");
}

notesList.addEventListener("click", function(e) {
  let target = e.target;
  if (target.tagName === 'STRONG') {
    target = target.parentElement;
  }
  if (target && target.classList.contains("note-box")) {
    const idx = target.getAttribute("data-idx");
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const note = notes[idx];
    if (note) {
      titleInput.value = note.title;
      textArea.value = note.text;
      selectedIdx = Number(idx);
      loadNotes();
    }
  }
});

deleteBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (selectedIdx !== null) {
    let notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.splice(selectedIdx, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    titleInput.value = "";
    textArea.value = "";
    selectedIdx = null;
    loadNotes();
  }
});

saveBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const title = titleInput.value.trim();
  const text = textArea.value.trim();
  if (title && text) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.push({ title, text });
    localStorage.setItem('notes', JSON.stringify(notes));
    titleInput.value = "";
    textArea.value = "";
    selectedIdx = null;
    loadNotes();
  }
});

window.addEventListener("DOMContentLoaded", loadNotes);