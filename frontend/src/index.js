import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Use uppercase 'App'
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ThemeProvider from "./context/ThemeProvider";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
); // Use uppercase 'App'
