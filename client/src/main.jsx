import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BookingContextProvider } from "./context/BookingContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <BookingContextProvider>
      <App />
      </BookingContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
