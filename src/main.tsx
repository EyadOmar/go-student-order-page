import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n.ts";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/en" />} />
      <Route path="/:lang/*" element={<App />} />
    </Routes>
  </BrowserRouter>,
);
