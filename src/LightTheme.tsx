import { createTheme, ThemeOptions } from "@mui/material";

export const LightTheme: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#262d1e",
    },
    secondary: {
      main: "#5a8662",
    },
    text: {
      primary: "#262d1e",
      secondary: "#262d1e",
    },
  },
});
