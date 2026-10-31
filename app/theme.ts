"use client";
import { createTheme } from "@mui/material/styles";

const heading = { fontFamily: "var(--font-head), Georgia, serif", fontWeight: 700 };

const theme = createTheme({
  palette: {
    primary: { main: "#0B6E99", dark: "#095A7D" },
    secondary: { main: "#FDB515", contrastText: "#04385B" },
    success: { main: "#128C4A", contrastText: "#ffffff" },
    text: { primary: "#04385B", secondary: "#475569" },
    background: { default: "#F7F4EE", paper: "#ffffff" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "var(--font-body), system-ui, sans-serif",
    h1: heading,
    h2: heading,
    h3: heading,
    h4: heading,
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 999 } } },
  },
});

export default theme;
