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
