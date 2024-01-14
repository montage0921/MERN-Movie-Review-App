//contain code for theme change
import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();

const defaultTheme = "light";
const darkTheme = "dark";

export default function ThemeProvider({ children }) {
  const toggleTheme = () => {
    //get first oldTheme
    const oldTheme = getTheme();

    //oldTheme is always opposite of newTheme
    //two possible values for them: 1. light/dark 2.dark/light
    //so if oldTheme is dark, then newTheme must be light and vice versa
    const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;

    addTheme(newTheme);
    removeTheme(oldTheme);

    saveTheme(newTheme);
  };

  useEffect(() => {
    //call when the page is refreshed
    //three possible conditions: " ", dark and light
    const theme = getTheme();
    if (!theme) addTheme(defaultTheme);
    else addTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const getTheme = () => {
  return localStorage.getItem("theme");
};

const saveTheme = (theme) => {
  localStorage.setItem("theme", theme);
};

const addTheme = (theme) => {
  document.documentElement.classList.add(theme);
};

const removeTheme = (theme) => {
  document.documentElement.classList.remove(theme);
};
