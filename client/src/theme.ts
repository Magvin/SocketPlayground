import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    background: {
      default: "#008081",
    },
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    text: {
      primary: "#fff",
    },
  },
});

export default theme;

export type ITheme = typeof theme;
