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
import { Link, Outlet } from "react-router-dom";
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
  const subTotal = items.reduce(
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
          <div className="fixed top-0 right-0 w-full md:w-[40vw] h-full bg-white shadow-2xl p-5 z-50 overflow-y-auto transition-all duration-500">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-lg font-bold text-orange-500">Your Cart</h2>
              <RxCross1
                onClick={() => setShowCart(false)}
                className="text-orange-500 cursor-pointer hover:text-orange-700 w-5 h-5"
              />
            </div>

            <div className="space-y-4">
              {items.length ? (
                items.map((item) => <CartCard key={item.id} item={item} />)
              ) : (
                <p className="text-center text-gray-500 mt-10">
                  🛒 Your cart is empty.
                </p>
              )}
            </div>

            {items.length > 0 && (
              <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>₹{deliveryCharges}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹{taxes}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg text-gray-900">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition">
                  <Link to='/checkout'> Proceed to Checkout</Link>
                </button>
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
