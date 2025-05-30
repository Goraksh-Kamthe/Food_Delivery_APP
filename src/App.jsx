import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Help from "./Pages/Help";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
