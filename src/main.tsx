import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </GlobalProvider>
  </StrictMode>
);
