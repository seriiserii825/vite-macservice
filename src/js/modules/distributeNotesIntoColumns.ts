import {INoteObject} from "../interfaces/INoteObject";
import toObject from "./toObject";

export default function distributeNotesIntoColumns(
  container_height: number,
  notesContainer: HTMLElement
) {
  const available_height = container_height;
  const notes_items = notesContainer.querySelectorAll(".notes__item") as NodeListOf<HTMLElement>;

  // Add type annotations to the arrays
  const first_column_notes: INoteObject[] = [];
  const second_column_notes: INoteObject[] = [];
  let first_column_height = 0;
  let second_column_height = 0;
  let filling_first_column = true;

  notes_items.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const styles = getComputedStyle(item);
    const marginBottom = parseFloat(styles.marginBottom) || 0;

    // Use getBoundingClientRect for precise height with decimals
    const isLast = index === notes_items.length - 1;
    const item_height = rect.height + (isLast ? 0 : marginBottom);

    // console.log(index + 1, "index + 1");
    // console.log("item_height", item_height);
    // console.log("first_column_height + item_height", first_column_height + item_height);
    // console.log(available_height, "available_height");

    if (filling_first_column) {
      if (first_column_height + item_height <= available_height) {
        first_column_notes.push(toObject(item));
        first_column_height += item_height;
      } else {
        // Start filling second column
        filling_first_column = false;
        if (second_column_height + item_height <= available_height) {
          second_column_notes.push(toObject(item));
          second_column_height += item_height;
        }
      }
    } else {
      if (second_column_height + item_height <= available_height) {
        second_column_notes.push(toObject(item));
        second_column_height += item_height;
      }
    }
  });

  return {
    first_column: first_column_notes,
    second_column: second_column_notes,
  };
}
