export default function infoBox() {
  const container_height = window.innerHeight - 128;
  // console.log(container_height, "container_height");
  const mainWrap = document.querySelector(".main-wrap");
  const infoBox = document.querySelector(".info-box");
  const notesContainer = document.querySelector(".notes");

  function fetchData() {
    // const url = "https://macservice.altuofianco.com/api/v1/tvfront";
    const url = 'http://localhost:8080/api/v1/tvfront';
    fetch(url, {
      headers: {
        appToken: "RkJBUfQZSCNwnfZlJub4",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        const commesse_list = data.data.commesse_list;
        let note_list = data.data.note_list;
        // note_list = note_list.slice(0, 7); // Limit to first 20 notes
        if (commesse_list) {
          drawInfoBoxItems(commesse_list);
        }
        if (note_list) {
          drawNotesItems(note_list);
          updateNotesColumns();
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        infoBox.innerHTML =
          '<div class="info-box__item info-box__item--error">Caricamento dati non riuscito</div>';
      });
  }
  fetchData();
  setInterval(fetchData, 60000); // Fetch data every 60 seconds

  function updateNotesColumns() {
    const notes = notesContainer;
    const notes_items_height = getNotesItemsHeight();

    const { first_column, second_column } = distributeNotesIntoColumns();
    // console.log(first_column, "first_column");
    // console.log(second_column, "second_column");

    const all_notes = [...first_column, ...second_column];

    if (notes_items_height > container_height) {
      notes.classList.add("notes--two-columns");
      mainWrap.classList.add("main-wrap--notes-columns");
      drawNotesItems(all_notes);
    } else {
      notes.classList.remove("notes--two-columns");
      mainWrap.classList.remove("main-wrap--notes-columns");
    }
    // window scroll to the top
    window.scrollTo(0, 0);
  }

  function getNotesItemsHeight() {
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

  function distributeNotesIntoColumns() {
    const window_height = container_height;
    const available_height = container_height;
    const notes_items = notesContainer.querySelectorAll(".notes__item");

    const first_column_notes = [];
    const second_column_notes = [];
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

  function drawInfoBoxItems(commesse_list) {
    infoBox.innerHTML = "";

    const inf_box_logo = `<div class="info-box__item info-box__item--logo">
          <img src="/img/mac-service-logo.png" alt="mac-service-logo">
        </div>`;
    infoBox.innerHTML = inf_box_logo;

    commesse_list.forEach((commessa) => {
      const info_box_item = `
        <div class="info-box__item ${commessa.attiva !== 1 ? "danger" : ""}">
          <div class="info-box__label">${commessa.Nome ?? ""}</div>
          <div class="info-box__value">${commessa.Note ?? ""}</div>
        </div>`;
      infoBox.innerHTML += info_box_item;
    });
  }

  function drawNotesItems(note_list) {
    notesContainer.innerHTML = "";

    note_list.forEach((note) => {
      const noteItem = `
        <div class="notes__item ${note.priorità ? "active" : ""}">${note.nota}</div>`;
      notesContainer.innerHTML += noteItem;
    });
  }

  function toObject(html_element) {
    const obj = {};
    const text = html_element.innerHTML;
    const active = html_element.classList.contains("active") ? 1 : 0;
    return {
      nota: text,
      priorità: active,
    };
  }
}
