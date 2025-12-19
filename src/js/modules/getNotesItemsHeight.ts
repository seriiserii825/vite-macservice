export default function getNotesItemsHeight(notesContainer: HTMLElement): number {
  const notes_items = notesContainer.querySelectorAll(".notes__item");
  let total_height = 0;

  notes_items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const styles = getComputedStyle(item);
    const marginBottom = parseFloat(styles.marginBottom) || 0;

    const item_height = rect.height + marginBottom;
    total_height += item_height;
  });

  return total_height;
}
