import axios, { isAxiosError } from "axios";
import {
  LoginType,
  newUserDataType,
  UpdateUserType,
  UserType,
  expo,
} from "../types";
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
export async function Login(loginData: LoginType) {
  try {
    const url = `${API_URL}/usuarios/login`;
    const { data } = await axios.post<UserType>(url, loginData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Usuario no encontrado");
    }
  }
}
// Esta función actualiza un usuario
export async function updateUser(id: number, userData: UpdateUserType) {
  try {
    const url = `${API_URL}/usuarios/${id}`;
    const { data } = await axios.patch<UserType>(url, userData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al actualizar el usuario"
      );
    } else {
      throw new Error("Error de conexión con el servidor");
    }
  }
}

export async function createExpo(dataexpo: expo) {
  try {
    const url = `${API_URL}/exposicions`;
    const { data } = await axios.post<expo>(url, dataexpo);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "expo no creada");
    }
  }
}
