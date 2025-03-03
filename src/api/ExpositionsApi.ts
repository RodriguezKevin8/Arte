import axios, { isAxiosError } from "axios";
import { Exposition, ObraDTO } from "../types";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAllExpositions() {
  try {
    const url = `${API_URL}/exposicions`;
    const { data } = await axios<Exposition[]>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "no se encontraron exposiciones"
      );
    }
  }
}

export async function getObrasByExposicion(id: number) {
  try {
    const url = `${API_URL}/obras/exposicion/${id}`;
    const { data } = await axios<ObraDTO[]>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error ||
          "no se encontraron obras en esta exposicion"
      );
    }
  }
}

export async function createObra(formData: FormData) {
  try {
    const url = `${API_URL}/obras`;
    const { data } = await axios<ObraDTO>(url, {
      method: "POST",
      data: formData,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data.error || "no se pudo crear la obra");
    }
  }
}

export async function deleteObra(obraId: number) {
  try {
    const url = `${API_URL}/obras/${obraId}`;
    await axios(url, { method: "DELETE" });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "no se pudo borrar la obra");
    }
  }
}
