import { createSlice } from "@reduxjs/toolkit";
 const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    AddItem: (state, actions) => {
      state.push(actions.payload);
    },
    RemoveItem:(state,actions)=>{
       return state.filter((item)=> item.id !==actions.payload)
    }
  },
});

export const {AddItem,RemoveItem} = CartSlice.actions;
export default CartSlice.reducer;
