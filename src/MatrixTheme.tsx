import { createTheme, ThemeOptions } from "@mui/material";

export const MatrixTheme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#ecefed",
    },
    secondary: {
      main: "#00ff41",
    },
    background: {
      paper: "#3b673f",
      default: "#262d1e",
    },
    text: {
      primary: "#edefec",
      secondary: "#ecefed",
      disabled: "rgba(150,178,226,0.96)",
    },
  },
});
