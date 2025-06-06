import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./demos/ipc";
import { AuthProvider } from "./lib/auth-context";
import { LanguageProvider } from "./lib/language-provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </AuthProvider>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
