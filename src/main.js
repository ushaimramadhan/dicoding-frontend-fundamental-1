import "./components/app-bar.js";
import "./components/note-item.js";
// import { notesData } from "./notes.js";
import "./components/note-input.js";
import "./style.css";
import "./components/loading-indicator.js";

const noteInputEl = document.querySelector("note-input");
if (noteInputEl) {
  noteInputEl.addEventListener("submit-note", (event) => {
    const { title, body } = event.detail;
    const newNote = {
      title: title,
      body: body,
    };
    insertNote(newNote);
  });
}

const BASE_URL = "https://notes-api.dicoding.dev/v2";
const getNotes = async () => {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const responseJson = await response.json();
    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      console.log("DATA BERHASIL DIAMBIL:", responseJson.data);
      renderNotes(responseJson.data);
    }
  } catch (error) {
    showResponseMessage(error);
  } finally {
    hideLoading();
  }
};
const showResponseMessage = (message = "Check your internet connection") => {
  alert(message);
};
getNotes();

const renderNotes = (notes) => {
  const notesListEl = document.getElementById("notes-list");
  notesListEl.innerHTML = "";

  notes.forEach((note) => {
    const noteElement = document.createElement("note-item");
    noteElement.note = note;

    noteElement.addEventListener("delete-note", (event) => {
      const noteId = event.detail.id;
      removeNote(noteId);
    });

    notesListEl.appendChild(noteElement);
  });
};

const insertNote = async (note) => {
  showLoading();
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    };

    const response = await fetch(`${BASE_URL}/notes`, options);
    const responseJson = await response.json();
    if (responseJson.error) {
      showResponseMessage(error);
    } else {
      getNotes();
    }
  } catch (error) {
    showResponseMessage(error);
  } finally {
    hideLoading();
  }
};

const removeNote = async (noteId) => {
  showLoading();
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, options);
    const responseJson = await response.json();
    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      getNotes();
    }
  } catch (error) {
    showResponseMessage(error);
  } finally {
    hideLoading();
  }
};

const loadingIndicator = document.querySelector("loading-indicator");
const showLoading = () => {
  loadingIndicator.style.display = "block";
};
const hideLoading = () => {
  loadingIndicator.style.display = "none";
};