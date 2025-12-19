export interface IResponse {
  status: string;
  data: IData;
}
export type IData = {
  commesse_list: ICommesseList[];
  note_list: INoteList[];
};
export type ICommesseList = {
  id_commessa: number;
  Nome: string;
  Note: null | string;
  attiva: number;
};
export type INoteList = {
  id_nota: number;
  nota: string;
  priorità: number;
};
