//contain code for theme change
import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();

const defaultTheme = "light";
const darkTheme = "dark";

export default function ThemeProvider({ children }) {
  const toggleTheme = () => {
    //get first oldTheme
    const oldTheme = localStorage.getItem("theme");

    //oldTheme is always opposite of newTheme
    //two possible values for them: 1. light/dark 2.dark/light
    //so if oldTheme is dark, then newTheme must be light and vice versa
    const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;

    document.documentElement.classList.add(newTheme);
    document.documentElement.classList.remove(oldTheme);

    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    //call when the page is refreshed
    //three possible conditions: " ", dark and light
    const theme = localStorage.getItem("theme");
    if (!theme) document.documentElement.classList.add(defaultTheme);
    else document.documentElement.classList.add(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
