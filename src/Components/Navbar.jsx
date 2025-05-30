import { MdFastfood } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { useContext, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { SearchItemContext } from "../Contex/SearchContex";
import { useSelector } from "react-redux";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
const {input,setInput,showCart,setShowCart}= useContext(SearchItemContext);
  const items = useSelector(state => state.cart)

  return (
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

          <div className="hidden md:flex flex-1 mx-6">
            <input
              type="text"
              onChange={(e)=>setInput(e.target.value)}
              value={input}
              placeholder="Search Your Favourite Food"
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
            />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-orange-500 transition">
              Help
            </button>
            <button className="relative text-gray-700 hover:text-orange-500 transition" onClick={()=>setShowCart(true)}>
              <FaCartArrowDown className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {items.length}
              </span>
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition shadow-md">
              Login
            </button>
            <button className="text-gray-600 hover:text-red-500 px-3 py-2 transition">
              Logout
            </button>
          </div>
        </div>
        {/* for Mobile  */}
        {menuOpen && (
          <div className="md:hidden mt-3 space-y-2 px-2">
            <input
              type="text"
              placeholder="Search Food"
              onChange={(e)=>setInput(e.target.value)}
              value={input}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
            />
            <button className="block w-full text-left text-gray-700 hover:text-orange-500 transition">
              Help
            </button>
            <button className="block w-full text-left relative text-gray-700 hover:text-orange-500 transition" onClick={()=>setShowCart(true)}>
              <FaCartArrowDown className="inline-block w-5 h-5 mr-2" />
              Cart{" "}
              <span className="ml-1 bg-red-500 text-white text-xs px-1 rounded-full">
                {items.length}
              </span>
            </button>
            <button className="block w-full text-left bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition shadow-md">
              Login
            </button>
            <button className="block w-full text-left text-gray-600 hover:text-red-500 px-3 py-2 transition">
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
