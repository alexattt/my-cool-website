import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IssPositionPage from "./pages/IssPositionPage";
import SpacePhotos from "./pages/SpacePhotosPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#372772",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/iss-location" element={<IssPositionPage />} />
              <Route path="/space-photos" element={<SpacePhotos />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
