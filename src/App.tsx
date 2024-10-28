import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Theme from "./Pages/Theme";
import { ThemeProvider } from "@emotion/react";
import { MatrixTheme } from "./MatrixTheme";

function App() {
  return (
    <>
      <ThemeProvider theme={MatrixTheme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='theme' element={<Theme />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
