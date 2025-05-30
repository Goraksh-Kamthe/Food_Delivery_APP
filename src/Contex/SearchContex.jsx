import React, { createContext, useState } from "react";
import { food_items } from "../Constant/FoodItem";
export const SearchItemContext = createContext();
function SearchContex({ children }) {
  const [input, setInput] = useState("");
  const [category, setcategory] = useState(food_items);
  const [showCart, setShowCart] = useState(false);
  let data = { input, setInput, category, setcategory, showCart, setShowCart };
  return (
    <div>
      <SearchItemContext.Provider value={data}>
        {children}
      </SearchItemContext.Provider>
    </div>
  );
}

export default SearchContex;
