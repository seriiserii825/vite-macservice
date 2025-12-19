import drawInfoBoxItems from "./drawInfoBoxItems";
import drawNotesItems from "./drawNotesItems";
import fetchCommesse from "./fetchCommesse";
import updateNotesColumns from "./updateNotesColumns";

export default async function commesse() {
  const container_height = window.innerHeight - 128;
  const mainWrap = document.querySelector(".main-wrap") as HTMLElement;
  const infoBox = document.querySelector(".info-box") as HTMLElement;
  const notesContainer = document.querySelector(".notes") as HTMLElement;

  try {
    const { commesse_list, note_list } = await fetchCommesse();

    if (commesse_list) {
      drawInfoBoxItems(commesse_list, infoBox);
    }

    if (note_list) {
      const double_notes = note_list.concat(note_list);
      console.log("double_notes", double_notes);
      drawNotesItems(double_notes, notesContainer);
      updateNotesColumns(notesContainer, container_height, mainWrap);
    }
  } catch (error) {
    console.log(error, "error");
  }
}

