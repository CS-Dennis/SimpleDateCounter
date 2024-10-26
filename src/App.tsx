import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Theme from "./Pages/Theme";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='theme' element={<Theme />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
