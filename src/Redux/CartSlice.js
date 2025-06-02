import { createSlice } from "@reduxjs/toolkit";
const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    AddItem: (state, actions) => {
      const existItemIndex = state.findIndex(
        (item) => item.id === actions.payload.id
      );
      if (existItemIndex !== -1) {
        state[existItemIndex].qty += 1;
      } else {
        state.push(actions.payload);
      }
    },
    RemoveItem: (state, actions) => {
      return state.filter((item) => item.id !== actions.payload);
    },
    IncrementCount:(state,actions)=>{
      const existItemIndex = state.findIndex(
        (item) => item.id === actions.payload.id
      );
      if (existItemIndex !== -1) {
        state[existItemIndex].qty +=1
      }
    },
    DecrementCount:(state,actions)=>{
      const existItemIndex = state.findIndex(
        (item) => item.id === actions.payload.id
      );
      if (existItemIndex !== -1 &&  state[existItemIndex].qty>1) {
        state[existItemIndex].qty -=1
      }
    }
  },
});

export const { AddItem, RemoveItem,DecrementCount, IncrementCount} = CartSlice.actions;
export default CartSlice.reducer;
