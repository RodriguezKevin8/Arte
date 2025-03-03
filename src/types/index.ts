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
//Las obras
export interface ObraDTO {
  id: number;
  titulo: string;
  estilo: string;
  precioSalida: number;
  imagenUrl: string;
  artista: number;
  exposicion: number;
  propietario: number;
}

export type ObraDeArte = {
  id: number;
  titulo: string;
  estilo: string;
  precioSalida: number;
  imagenUrl: string;
  artista: number;
  exposicion: number;
  fechaCreacion: string;
  propietario: number;
};
export type ObraDeArteDetalladaType = {
  id: number;
  titulo: string;
  estilo: string;
  precioSalida: number;
  imagenUrl: string;
  artistaId: number;
  artistaNombre: string;
  artistaEmail: string;
  fechaCreacion: string; // O `Date` si lo conviertes antes
};

// type de oferta
export type OfertaType = {
  fechaOferta: string;
  monto: number;
  obra: number;
  usuario: number;
};
