import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router/dom";
import router from "./app/routes.tsx";
import "halfmoon/css/halfmoon.min.css";
import "halfmoon/css/cores/halfmoon.modern.css";
// Supports weights 300-800
import '@fontsource-variable/google-sans-code';
import '@fontsource/aref-ruqaa/400.css';
import '@fontsource/aref-ruqaa/700.css';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
