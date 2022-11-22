
const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");
const deleteAllNotesButton = notesContainer.querySelector(".remove-note");

getNotes().forEach(note => {
    // Create Note Elements parameters are obtained from the local storage.
    const noteElement = createNoteElement(note.id, note.content);
    // Adding the new note before the button element.
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());
deleteAllNotesButton.addEventListener("click", () => deleteAllNotes());

//Local storage saves data in key value pair strings.

// Obtains all notes from local storage on the client browser.
function getNotes() {
    // Attempts to get all the notes stored inside the local storage.
    // If it is the first time the user loads the application, then defaults to an empty array.
    // Parse -> converts the JSON string into a JS array, which is a list of nodes.
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// Parameter of array of notes and saves new notes to local storage on the client browser.
function saveNote(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// Creating new Text Area.
function createNoteElement(id, content) {
    // Creates a new HTML textarea.
    const element = document.createElement("textarea");

    // Adding a class to the element therefore css can be applied.
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Add Text Here ..."

    // Adding Event Listenters to trigger functions.
    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        // User promted with confirmation, and returns a bool value.
        const doDelete = confirm("Are you sure you wish to delete this sticky ntoe?");

        if (doDelete) {
            deleteNote(id, element);
        }
    });

    return element;
}

// Adding new note and saving note to local storage
function addNote() {
    const currentNote = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    currentNote.push(noteObject);
    saveNote(currentNote);
}

// Updates content of Note
function updateNote (id, newContent) {
    console.log("Updating Note ...");
    console.log(id, newContent);

    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNote(notes);
}

// Removes notes from HTML
function deleteNote(id, element) {
    console.log("Deleting Note ...");
    console.log(id);

    const notes = getNotes().filter(note => note.id != id);

    saveNote(notes);
    notesContainer.removeChild(element);
}

// Removes all notes from HTML
function deleteAllNotes() {
    console.log("Deleting All Notes ...");

    localStorage.removeItem("stickynotes-notes");

    const notes = notesContainer.querySelectorAll("textarea");
    notes.forEach( note => {
        note.remove();
    });
}
