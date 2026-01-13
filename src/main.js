import "./components/app-bar.js";
import "./components/note-item.js";
import { notesData } from "./notes.js";
import "./components/note-input.js";
import "./style.css";

const notesListEl = document.getElementById("notes-list");
notesData.forEach((note) => {
  const noteElement = document.createElement("note-item");
  noteElement.note = note;
  notesListEl.appendChild(noteElement);
});

const noteInputEl = document.querySelector("note-input");

if (noteInputEl) {
  noteInputEl.addEventListener("submit-note", (event) => {
    const newNote = event.detail;
    const noteElement = document.createElement("note-item");
    noteElement.note = newNote;
    const notesListEl = document.getElementById("notes-list");
    notesListEl.appendChild(noteElement);
  });
}