import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { SearchItemContext } from "../Contex/SearchContex";
import CartCard from "../Components/CartCard";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { input, category, setcategory, showCart, setShowCart } =
    useContext(SearchItemContext);
  const items = useSelector((state) => state.cart);
  console.log(items);
  const subTotal = items.reduce(
    (total, items) => total + items.price * items.qty,
    0
  );
  const deliveryCharges = 25;
  const taxes = Math.floor(subTotal * (5 / 100));
  const total = subTotal + deliveryCharges + taxes;
  const navigate = useNavigate();
  const HandleOrderPlace = () => {
    navigate("/");
    toast.success("Your order has been placed successfully");
  };
  return (
    <div className="min-h-screen bg-orange-50 p-6 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Checkout</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Delivery Information
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                placeholder="Mobile Number"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              />
              <textarea
                placeholder="Delivery Address"
                className="w-full px-4 py-2 border rounded-md resize-none h-24 focus:ring-2 focus:ring-orange-400"
              ></textarea>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Payment Method
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="radio" name="payment" id="cod" className="mr-2" />
                <label htmlFor="cod" className="text-gray-600">
                  Cash on Delivery
                </label>
              </div>
              <div className="flex items-center">
                <input type="radio" name="payment" id="card" className="mr-2" />
                <label htmlFor="card" className="text-gray-600">
                  Credit / Debit Card
                </label>
              </div>
              <div className="flex items-center">
                <input type="radio" name="payment" id="upi" className="mr-2" />
                <label htmlFor="upi" className="text-gray-600">
                  UPI / Wallet
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={HandleOrderPlace}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Place Order
          </button>
        </div>

        <div>
          {items.length &&
            items.map((item) => (
              <CartCard key={item.id} item={item} isFromCheckout={true} />
            ))}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
