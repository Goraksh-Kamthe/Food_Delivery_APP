import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Categories } from "../Constant/Categories";
import FoodItemCard from "../Components/FoodItemCard";
import { food_items } from "../Constant/FoodItem";
import Footer from "../Components/Footer";
import { SearchItemContext } from "../Contex/SearchContex";
import { RxCross1 } from "react-icons/rx";
import CartCard from "../Components/CartCard";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
function Home() {
  const { input, category, setcategory, showCart, setShowCart } =
    useContext(SearchItemContext);
  useEffect(() => {
    const serachData = food_items.filter((item) =>
      item.food_name.toLowerCase().includes(input.toLowerCase())
    );
    setcategory(serachData);
  }, [input]);
  const filterCategory = (cat) => {
    if (cat === "All") {
      setcategory(food_items);
    } else {
      const filterData = food_items.filter(
        (item) => item.food_category === cat
      );
      setcategory(filterData);
    }
  };
  const items = useSelector((state) => state.cart);
  const itemWithoutOrderPlaced = items.filter(x=> !x.orderPlaced)
  const subTotal = itemWithoutOrderPlaced.reduce(
    (total, items) => total + items.price * items.qty,
    0
  );
  const deliveryCharges = 25;
  const taxes = Math.floor(subTotal * (5 / 100));
  const total = subTotal + deliveryCharges + taxes;

  return (
    <>
      <ToastContainer />

      {/* <Navbar /> */}
      <div className="px-5">
        {!input.length ? (
          <div className="mt-4 px-4">
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 md:flex md:flex-nowrap md:overflow-x-auto md:gap-5 lg:justify-center">
              {Categories?.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    onClick={() => filterCategory(category.name)}
                    className="flex flex-col items-center bg-orange-50 p-4 rounded-xl shadow-md hover:shadow-xl hover:bg-orange-100 transition duration-300 cursor-pointer group min-w-[80px] flex-shrink-0"
                  >
                    <div className="bg-white rounded-full p-3 shadow group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-orange-500" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-700 group-hover:text-orange-600 text-center">
                      {category.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {category.map((item) => (
            <FoodItemCard key={item.id} item={item} />
          ))}
        </div>
        
       {showCart && (
  <div className="fixed top-0 right-0 w-full md:w-[40vw] h-full bg-white shadow-2xl z-50 transition-all duration-500 overflow-y-auto rounded-l-3xl border-l-4 border-orange-400">
    {/* Header */}
    <div className="flex justify-between items-center p-5 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-orange-500">Your Cart</h2>
      <RxCross1
        onClick={() => setShowCart(false)}
        className="text-orange-500 hover:text-orange-600 cursor-pointer w-6 h-6 transition"
      />
    </div>

    {/* Content */}
    <div className="p-5">
      {itemWithoutOrderPlaced.length ? (
        <div className="space-y-4">
          {itemWithoutOrderPlaced.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-orange-50 rounded-xl shadow-inner animate-fade-in">
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-gray-700 text-lg font-semibold">Your cart is empty!</p>
          <p className="text-sm text-gray-500 mt-1">
            Looks like you haven’t added anything yet.
          </p>

          <button
            onClick={() => setShowCart(false)}
            className="mt-6 bg-gradient-to-r from-orange-500 to-emerald-500 hover:from-orange-600 hover:to-emerald-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition duration-300"
          >
            Browse Delicious Items
          </button>
        </div>
      )}
    </div>

    {/* Footer */}
    {itemWithoutOrderPlaced.length > 0 && (
      <div className="p-5 mt-4 border-t border-gray-200 space-y-3 bg-gray-50 rounded-t-2xl">
        <div className="flex justify-between text-sm text-gray-700">
          <span>Subtotal</span>
          <span>₹{subTotal}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span>Delivery Charges</span>
          <span>₹{deliveryCharges}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span>Taxes</span>
          <span>₹{taxes}</span>
        </div>

        <hr className="my-2 border-gray-300" />

        <div className="flex justify-between font-bold text-lg text-gray-900">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <Link to="/checkout">
          <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-semibold transition shadow">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    )}
  </div>
)}

      </div>

      <Footer />
    </>
  );
}

export default Home;
