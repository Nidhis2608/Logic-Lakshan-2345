import React from "react";
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import { AuthProvider } from "./AuthContext/AuthContext"; // Import the AuthProvider
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "./admin/theme";

function App() {
  const theme = createTheme({
    colorPreset: "green",
    contrast: "high",
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AllRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
