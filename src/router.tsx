import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginRegister/LoginPage";
import RegisterPage from "./pages/LoginRegister/Register";
import AuthRouteProtection from "./helpers/AuthRouteProtection";
import ProfilePage from "./pages/ProfilePage";
import Obras from "./pages/Obras";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/obras",
        element: <Obras />,
      },
      {
        path: "/perfil",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthRouteProtection />,
    children: [
      {
        path: "login", // Esto crea la ruta /auth/login
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
