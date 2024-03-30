import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./axios.config.js";
import "./Interceptors/authInterceptors.js";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Hooks/useAuth";
import { LoadingProvider } from "./Hooks/useLoading.jsx";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
