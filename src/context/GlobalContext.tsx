import { createContext, ReactNode, useEffect, useState } from "react";
import { UserType } from "../types";

type GlobalroviderProps = {
  children: ReactNode;
};

type GlobalContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext<GlobalContextType>(null!);

export const GlobalProvider = ({ children }: GlobalroviderProps) => {
  //Este es el estado en el que se setea el typo del usuario
  const [user, setUser] = useState<UserType>({ id: 0, nombre: "", email: "" });
  // Uso useEffect para cargar los datos del localStorage solo una vez, porque si queda asi chulon cae en un bucle infinito(negro)
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    //Lo que esta dentro de value es lo que se pasa a toda la app
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
