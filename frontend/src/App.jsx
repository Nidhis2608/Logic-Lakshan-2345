// import "./App.css";
// import Navbar from "./components/Navbar";
// import Login from "./components/login";
// import AllRoutes from "./Routes/AllRoutes";

// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { createTheme } from "./admin/theme";

// function App() {
//   const theme = createTheme({
//     colorPreset: "green",
//     contrast: "high",
//   });
//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <AllRoutes />
//         <Navbar />
//         <Login />
//       </ThemeProvider>
//     </>
//   );
// }

// export default App;

import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
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
