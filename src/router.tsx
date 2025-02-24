import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainLayout from "./Layouts/MainLayout";
import LoginLayout from "./Layouts/LoginLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginRegister/LoginPage";
import RegisterPage from "./pages/LoginRegister/Register";

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
        path: "/ejemplo",
        element:  <h1>hola soy un ejemplo</h1>
      },
    ],
  },
  {
    path: "/auth",
    element: <LoginLayout />, 
    children: [
      {
        path: "login", // Esto crea la ruta /auth/login
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />
      }
    ],
  },
]);
