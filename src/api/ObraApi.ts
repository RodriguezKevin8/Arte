import axios, { isAxiosError } from "axios";
import { ObraDeArteDetalladaType, OfertaType } from "../types";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function getObraDetail(id: string) {
  try {
    const { data } = await axios<ObraDeArteDetalladaType>(
      `${API_URL}/obras/${id}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Obra no encontrada");
    }
  }
}

export async function makeAnOffert(offertData: OfertaType) {
  try {
    const { data } = await axios.post(`${API_URL}/ofertas`, offertData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Ocurrio un error");
    }
  }
}

export async function getOfferts(id: number) {
  try {
    const { data } = await axios(`${API_URL}/ofertas/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Ocurrio un error al obtener las ofertas"
      );
    }
  }
}
