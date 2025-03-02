import { createContext, ReactNode, useState } from "react";
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
  const [user, setUser] = useState<UserType>({ id: 0, nombre: "", email: "" });

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
