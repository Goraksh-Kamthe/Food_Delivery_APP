import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Help from "./Pages/Help";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import Signup from "./Pages/Signup";
import ContactUs from "./Pages/ContactUs";
import MyAccount from "./Pages/MyAccount";
import Checkout from "./Pages/Checkout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/help" element={<Help />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
