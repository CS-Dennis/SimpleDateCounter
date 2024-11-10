import { createTheme, ThemeOptions } from "@mui/material";

export const MatrixTheme: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00ff41",
    },
    secondary: {
      main: "#5a8662",
    },
    background: {
      paper: "#3b673f",
      default: "#262d1e",
    },
    text: {
      primary: "#00ff41",
      secondary: "#00ff41",
      disabled: "rgba(150,178,226,0.96)",
    },
  },
});
