import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setUpTheme } from "./theme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

export const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export function useIsSystemDarkMode() {
    const darkThemeMq = useMemo(
        () => window.matchMedia("(prefers-color-schema: dark)"), []
    )

    const [isSystemDarkMode, setIsSystemDarkMode] = useState(darkThemeMq.matches);

    useEffect(() => {
        const darkThemeMqListener = (event) => {
            setIsSystemDarkMode(event.matches);
        }
        darkThemeMq.addEventListener("change", darkThemeMqListener);
        return () => darkThemeMq.removeEventListener("change", darkThemeMqListener);
    }, [darkThemeMq]);

    return {
        isSystemDarkMode
    }
}

const ThemeProvider = ({ children }) => {
  const {isSystemDarkMode} = useIsSystemDarkMode();

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme){
        return savedTheme;
    }
    return "system";
  }

  const [themePref, setThemePref] = useState(getInitialTheme);

  const theme = useMemo(() => {
     if (themePref === "system") {
       return setUpTheme(isSystemDarkMode ? "dark" : "light");
     }
       return setUpTheme(themePref);
  }, [themePref, isSystemDarkMode]);

  useEffect(() => {
    localStorage.setItem("theme", themePref);
  }, [themePref]);

  const toggleTheme = (newTheme) => {
    setThemePref(newTheme);
  }

  return (
    <ThemeContext.Provider value={{themePref, toggleTheme}}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
