import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Help from "./Pages/Help";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ContactUs from "./Pages/ContactUs";
import MyAccount from "./Pages/MyAccount";
import Checkout from "./Pages/Checkout";
import AuthGuard from "./Route-Guards/AuthGuard";
import Layout from "./Components/Layout";

const ProtectedRoute = ({ children }) => <AuthGuard>{children}</AuthGuard>;



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout with Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* Protected Routes */}
          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
