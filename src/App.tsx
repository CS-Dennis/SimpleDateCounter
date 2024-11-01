import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Theme from "./Pages/Theme";
import { ThemeProvider } from "@emotion/react";
import { MatrixTheme } from "./MatrixTheme";
import { LightTheme } from "./LightTheme";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext<any>({ matrixTheme: true });
function App() {
  const [appTheme, setAppTheme] = useState({ matrixTheme: true });

  useEffect(() => {
    const isMatrixTheme = sessionStorage.getItem("matrixTheme");
    if (isMatrixTheme === undefined) {
      sessionStorage.setItem("matrixTheme", "true");
    } else if (isMatrixTheme !== undefined && isMatrixTheme === "true") {
      setAppTheme({ matrixTheme: true });
    } else {
      setAppTheme({ matrixTheme: false });
    }
  }, []);

  return (
    <>
      <AppContext.Provider value={{ appTheme, setAppTheme }}>
        <ThemeProvider theme={appTheme.matrixTheme ? MatrixTheme : LightTheme}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='theme' element={<Theme />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;
