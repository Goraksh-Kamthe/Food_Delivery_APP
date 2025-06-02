import { MdFastfood } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { SearchItemContext } from "../Contex/SearchContex";
import { toast, ToastContainer } from "react-toastify";
import { MdAccountCircle } from "react-icons/md";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isShowSearchBarandCart, setIsShowSearchBarandCart] = useState(false);
  const { input, setInput, setShowCart } = useContext(SearchItemContext);
  const items = useSelector((state) => state.cart);
  const geturlData = useLocation().pathname;
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(SearchItemContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (geturlData === "/" || geturlData === "/home") {
      setIsShowSearchBarandCart(true);
    } else {
      setIsShowSearchBarandCart(false);
    }
  }, [geturlData]);
  const handleLogout = () => {
    toast.error("Logout Successfully");
    setTimeout(() => {
      localStorage.clear();
      setIsUserLoggedIn(false), navigate("/login");
    }, 500);
  };
  return (
    <>
      <div className="w-full">
        <nav className="bg-slate-400 shadow-lg px-4 py-3 md:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MdFastfood className="w-8 h-8 md:w-10 md:h-10 text-orange-600" />
              <span className="text-xl md:text-2xl font-bold text-orange-600">
                FoodieExpress
              </span>
            </div>
            {/* for Mobile  */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-800"
              >
                {menuOpen ? (
                  <HiX className="w-6 h-6" />
                ) : (
                  <HiMenuAlt3 className="w-6 h-6" />
                )}
              </button>
            </div>

            <div
              className={`${
                isShowSearchBarandCart ? "" : "invisible "
              }hidden md:flex flex-1 mx-6 `}
            >
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Search Your Favourite Food"
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
              />
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-orange-500 transition">
                <Link to="/home">Home</Link>
              </button>
              <button className="text-gray-700 hover:text-orange-500 transition">
                <Link to="/help">Help</Link>
              </button>
              <button className="text-gray-700 hover:text-orange-500 transition">
                <Link to="/contact-us">Contact-Us</Link>
              </button>
              <button className="text-gray-700 hover:text-orange-500 transition">
                <Link to="/my-account">
                  <MdAccountCircle className="inline" />
                  My Account
                </Link>
              </button>
              {isShowSearchBarandCart && <button
                className="relative text-gray-700 hover:text-orange-500 transition"
                onClick={() => setShowCart(true)}
              >
                <FaCartArrowDown className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  {items.length}
                </span>
              </button>}
              {!isUserLoggedIn ? (
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition shadow-md">
                  <Link to="/login">Login</Link>
                </button>
              ) : (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition shadow-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
          {/* for Mobile  */}
          {menuOpen && (
            <div className="md:hidden mt-3 space-y-2 px-2">
              <input
                type="text"
                placeholder="Search Food"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className={`${
                  isShowSearchBarandCart ? "" : "invisible "
                } w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm`}
              />
              <button className="block w-full text-left text-gray-700 hover:text-orange-500 transition">
                <Link to="/home">Home</Link>
              </button>
              <button className="block w-full text-left text-gray-700 hover:text-orange-500 transition">
                <Link to="/help">Help</Link>
              </button>
              <button className="block w-full text-left text-gray-700 hover:text-orange-500 transition">
                <Link to="/contact-us">Contact-Us</Link>
              </button>
              <button className="block w-full text-left text-gray-700 hover:text-orange-500 transition">
                <Link to="/my-account">
                  <MdAccountCircle className="inline" />
                  My Account
                </Link>
              </button>
              {isShowSearchBarandCart && <button
                className="block w-full text-left relative text-gray-700 hover:text-orange-500 transition"
                onClick={() => setShowCart(true)}
              >
                <FaCartArrowDown className="inline-block w-5 h-5 mr-2" />
                Cart{" "}
                <span className="ml-1 bg-red-500 text-white text-xs px-1 rounded-full">
                  {items.length}
                </span>
              </button>}

              {!isUserLoggedIn ? (
                <button className="block w-full text-left bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition shadow-md">
                  <Link to="/login">Login</Link>
                </button>
              ) : (
                <button
                  className="block w-full text-left bg-red-300 hover:bg-red-400 text-white px-4 py-2 rounded-full transition shadow-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </nav>
      </div>
      <Outlet></Outlet>
    </>
  );
}

export default Navbar;
