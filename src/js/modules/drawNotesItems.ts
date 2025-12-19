import {INoteObject} from "../interfaces/INoteObject";

export default function drawNotesItems(note_list: INoteObject[], notesContainer: HTMLElement) {
  notesContainer.innerHTML = "";

  note_list.forEach((note) => {
    const noteItem = `
        <div class="notes__item ${note.priorità ? "active" : ""}">${note.nota}</div>`;
    notesContainer.innerHTML += noteItem;
  });
}
