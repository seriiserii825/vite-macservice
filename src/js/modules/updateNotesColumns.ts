import distributeNotesIntoColumns from "./distributeNotesIntoColumns";
import drawNotesItems from "./drawNotesItems";
import getNotesItemsHeight from "./getNotesItemsHeight";

export default function updateNotesColumns(
  notesContainer: HTMLElement,
  container_height: number,
  mainWrap: HTMLElement,
) {
  const notes = notesContainer;
  const notes_items_height = getNotesItemsHeight(notesContainer);

  const { first_column, second_column } = distributeNotesIntoColumns(
    container_height,
    notesContainer
  );
  // console.log(first_column, "first_column");
  // console.log(second_column, "second_column");

  const all_notes = [...first_column, ...second_column];

  if (notes_items_height > container_height) {
    notes.classList.add("notes--two-columns");
    mainWrap.classList.add("main-wrap--notes-columns");
    drawNotesItems(all_notes, notesContainer);
  } else {
    notes.classList.remove("notes--two-columns");
    mainWrap.classList.remove("main-wrap--notes-columns");
  }
  // window scroll to the top
  window.scrollTo(0, 0);
}
