import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import NavBar from "../components/NavbarLogin";

const AuthRouteProtection = () => {
  //Acá se obtienen los datos del usuario del contexto global calo
  const { user } = useGlobalContext();

  // Si hay un usuario, redirige a la página de inicio
  if (user.id !== 0) {
    return <Navigate to="/" replace />;
  }

  // Si no hay usuario, permite el acceso a la ruta
  return (
    <>
      <NavBar />
      <Outlet />;
    </>
  );
};

export default AuthRouteProtection;
