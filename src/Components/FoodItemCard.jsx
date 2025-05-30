import React from "react";
import { LuLeaf } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { BsCartPlusFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { AddItem } from "../Redux/CartSlice";
import { toast } from "react-toastify";

function FoodItemCard({ item }) {
  const isVeg = item.food_type.toLowerCase() === "veg";
  const dispatch = useDispatch();
  const handleAddToCart = (item) =>{
  dispatch(AddItem({ id: item.id,name:item.food_name,price:item.price,image:item.food_image,qty:1 }))
  toast.success('Dish Added in cart')

  }
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-lg transition duration-300 overflow-hidden group border border-gray-100">
      <div className="relative">
        <img
          src={item.food_image}
          alt={item.food_name}
          className="w-full h-48  group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
          {item.food_category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-500 transition">
          {item.food_name}
        </h3>

        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center font-bold text-gray-700">
            <FaRupeeSign className="w-4 h-4 mr-1 text-orange-500" />
            {item.price}
          </div>
          <div className="flex items-center">
            {isVeg ? (
              <>
                <LuLeaf className="text-green-600 w-4 h-4 mr-1" />
                <span className="text-xs text-green-600">Veg</span>
              </>
            ) : (
              <>
                <GiChickenOven className="text-red-600 w-4 h-4 mr-1" />
                <span className="text-xs text-red-600">Non-Veg</span>
              </>
            )}
          </div>
        </div>

        <button
          className="mt-4 w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full shadow transition"
          onClick={() => handleAddToCart(item)}
        >
          <BsCartPlusFill className="mr-2" />
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default FoodItemCard;
