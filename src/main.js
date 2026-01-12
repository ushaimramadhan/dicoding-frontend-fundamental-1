import "./components/app-bar.js";
import "./components/note-item.js";
import { notesData } from "./notes.js";
import "./components/note-input.js";

const notesListEl = document.getElementById("notes-list");

notesData.forEach((note) => {
  const noteElement = document.createElement("note-item");
  noteElement.note = note;
  notesListEl.appendChild(noteElement);
});