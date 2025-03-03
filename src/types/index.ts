export type newUserDataType = {
  nombre: string;
  email: string;
  password: string;
};

export type UserType = {
  id: number;
  nombre: string;
  email: string;
};
export type LoginType = Omit<newUserDataType, "nombre">;

export type UpdateUserType = {
  nombre?: string;
  email?: string;
  password?: string;
};

export type expo = {
  titulo: string;
  descripcion: string;
  fechaInauguracion: string;
  fechaClausura: string;
};
//Tipos de exposiciones

export interface Exposition {
  id: number;
  descripcion: string;
  fechaClausura: string;
  fechaInauguracion: string;
  titulo: string;
}
