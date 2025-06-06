import { useContext, useMemo, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdAccountCircle, MdDeliveryDining, MdFastfood } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SearchItemContext } from "../Contex/SearchContex";
function NavLinkBtn({ to, children, className = "", ...rest }) {
  return (
    <button
      className={`text-gray-700 hover:text-orange-500 font-medium transition ${className}`}
      {...rest}
    >
      <Link to={to}>{children}</Link>
    </button>
  );
}

function SearchInput({ value, onChange, visible }) {
  if (!visible) return null;
  return (
    <input
      type="text"
      placeholder="Search Your Favourite Food"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
    />
  );
}

function CartButton({ count, onClick, visible }) {
  if (!visible) return null;
  return (
    <button
      className="relative text-gray-700 hover:text-orange-500 transition"
      onClick={onClick}
      aria-label="Cart"
    >
      <FaCartArrowDown className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
}

function AuthButton({ isLoggedIn, onLogout }) {
  return isLoggedIn ? (
    <button
      onClick={onLogout}
      className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300"
    >
      <FiLogOut className="w-5 h-5" />
      Logout
    </button>
  ) : (
    <Link to="/login">
      <button className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300">
        <FiLogIn className="w-5 h-5" />
        Login
      </button>
    </Link>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { input, setInput, setShowCart, isUserLoggedIn, setIsUserLoggedIn } =
    useContext(SearchItemContext);
  const items = useSelector((state) => state.cart);
  const location = useLocation();
  const navigate = useNavigate();
  const itemsWithoutOrderPlaced = items.filter((x) => !x.orderPlaced);
  const itemsWithOrderPlaced = items.filter((x) => x.orderPlaced);
  console.log(itemsWithoutOrderPlaced);

  // Show search bar and cart only on "/" and "/home"
  const isShowSearchBarAndCart = useMemo(() => {
    return location.pathname === "/" || location.pathname === "/home";
  }, [location.pathname]);

  const handleLogout = () => {
    toast.error("Logout Successfully");
    setTimeout(() => {
      setIsUserLoggedIn(false);
      navigate("/login");
    }, 500);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-500 via-orange-400  to-slate-500 shadow-lg px-4 py-3 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <MdFastfood className="w-8 h-8 md:w-10 md:h-10 text-orange-600" />
          <span className="text-xl md:text-2xl font-bold text-orange-600">
            FoodieExpress
          </span>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-gray-800"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenuAlt3 className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Search input for desktop */}
        <div
          className={`hidden md:flex flex-1 mx-6 ${
            isShowSearchBarAndCart ? "" : "invisible"
          }`}
        >
          <SearchInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            visible
          />
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLinkBtn to="/home">Home</NavLinkBtn>
          <NavLinkBtn to="/help">Help</NavLinkBtn>
          <NavLinkBtn to="/contact-us">Contact-Us</NavLinkBtn>
          <NavLinkBtn to="/my-account">
            <MdAccountCircle className="inline mr-1" />
            My Account
          </NavLinkBtn>

          <CartButton
            count={itemsWithoutOrderPlaced.length}
            onClick={() => setShowCart(true)}
            visible={isShowSearchBarAndCart}
          />
          {itemsWithOrderPlaced.length ? (
            <button
              className="relative text-gray-700 hover:text-orange-500 transition"
             
              aria-label="Cart"
            >
              <MdDeliveryDining className="w-5 h-5 inline" />
              <Link to="/my-orders">My Orders</Link>
              {itemsWithOrderPlaced.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  {itemsWithOrderPlaced.length}
                </span>
              )}
            </button>
          ) : (
            ""
          )}

          <AuthButton isLoggedIn={isUserLoggedIn} onLogout={handleLogout} />
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-2 px-2">
          <SearchInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            visible={isShowSearchBarAndCart}
          />

          <NavLinkBtn to="/home" className="block w-full text-left">
            Home
          </NavLinkBtn>
          <NavLinkBtn to="/help" className="block w-full text-left">
            Help
          </NavLinkBtn>
          <NavLinkBtn to="/contact-us" className="block w-full text-left">
            Contact-Us
          </NavLinkBtn>
          <NavLinkBtn
            to="/my-account"
            className="block w-full text-left flex items-center"
          >
            <MdAccountCircle className="inline mr-1" />
            My Account
          </NavLinkBtn>

          <CartButton
            count={items.length}
            onClick={() => setShowCart(true)}
            visible={isShowSearchBarAndCart}
            className="block w-full text-left"
          />

          <AuthButton isLoggedIn={isUserLoggedIn} onLogout={handleLogout} />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
