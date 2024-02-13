import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { NotificationContext } from "../context/NotificationProvider";

//after create context and set its provider,
//we need to create a hook which use these context
//useContext() returns value of the Context.Provider which is a function
export const useTheme = () => useContext(ThemeContext);
export const useNotification = () => useContext(NotificationContext);
