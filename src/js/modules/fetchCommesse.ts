import { ICommesseList, IData, INoteList, IResponse } from "../interfaces/IResponse";

export default async function fetchCommesse(): Promise<{
  commesse_list: ICommesseList[];
  note_list: INoteList[];
}> {
  const url = "http://localhost:8080/api/v1/tvfront";

  try {
    const response = await fetch(url, {
      headers: {
        appToken: "RkJBUfQZSCNwnfZlJub4",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data: IResponse = await response.json();

    const res_data: IData = data.data;

    return {
      commesse_list: res_data.commesse_list,
      note_list: res_data.note_list,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
