import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Use uppercase 'App'
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ThemeProvider from "./context/ThemeProvider";
import NotificationProvider from "./context/NotificationProvider";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <NotificationProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </NotificationProvider>
  </BrowserRouter>
); // Use uppercase 'App'
