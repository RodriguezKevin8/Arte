import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

import MainLayout from "./Layouts/MainLayout";
import HomePage from "./pages/HomePage";

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
    ],
  },
  {
    path: "/auth",
    element: <h2>Probando</h2>,
  },
]);
