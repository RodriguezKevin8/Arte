import { Outlet } from "react-router-dom";
import NavBarLogin from "../components/NavbarLogin";

export default function LoginLayout() {
  return (
    <>
      <NavBarLogin />
      <Outlet />
    </>
  );
}
