import { ICommesseList } from "../interfaces/IResponse";

export default function drawInfoBoxItems(commesse_list: ICommesseList[], infoBox: HTMLElement) {
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
