import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

// initPyodide().then((pyodide) => (window.pyodide = pyodide));
// console.log("oi");
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        theme="light"
      />
    </QueryClientProvider>
  </React.StrictMode>,
);
