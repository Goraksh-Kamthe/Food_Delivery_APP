import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { DecrementCount, IncrementCount, RemoveItem } from "../Redux/CartSlice";
import { toast } from "react-toastify";

function CartCard({ item,isFromCheckout= false }) {
 

  function handleCount(opr) {
    if (opr === "sub") {
      dispatch(DecrementCount({ id:item.id }));
    } else {
      dispatch(IncrementCount({ id:item.id }));
    }
  }
  const dispatch = useDispatch();
  const handleRemoveToCart = (item) => {
    dispatch(RemoveItem(item.id));
    toast.error("Dish Removed from cart");
  };

  return (
    <div className="w-full mt-3 max-w-4xl mx-auto bg-white shadow-md rounded-xl flex items-center p-4 mb-4 relative">
      <div className="w-24 h-24 overflow-hidden rounded-lg mr-4">
        <img
          src={item.image}
          alt="pancake"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{item.price}/-</p>

       {!isFromCheckout ? (<div className="flex items-center">
          <button
            onClick={() => handleCount("sub")}
            className="w-10 h-10 flex items-center justify-center text-xl font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-l-full transition-all duration-200"
          >
            −
          </button>
          <div className="w-12 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-800 font-semibold text-lg">
            {item.qty}
          </div>
          <button
            onClick={() => handleCount("add")}
            className="w-10 h-10 flex items-center justify-center text-xl font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-r-full transition-all duration-200"
          >
            +
          </button>
        </div>):
        <>
        Quantity  {item.qty}
        </>}
       
      </div>

      {!isFromCheckout && <button
        className="absolute right-4 top-4 text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-full transition-all"
        title="Remove Item"
        onClick={() => handleRemoveToCart(item)}
      >
        <MdDelete className="w-5 h-5" />
      </button>}
    </div>
  );
}

export default CartCard;
