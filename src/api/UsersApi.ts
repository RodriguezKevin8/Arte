import axios, { isAxiosError } from "axios";
import { newUserDataType } from "../types";
//Esto es lo de el .env
const API_URL = import.meta.env.VITE_BACKEND_URL;

//Esta función crea un usuario
export async function createUser(userData: newUserDataType) {
  try {
    const url = `${API_URL}/usuarios`;
    const { data } = await axios.post(url, userData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error al crear el usuario");
    }
  }
}
