import { createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, id) => state.findIndex((item) => item.id === id);

const date = new Date().toISOString().split('T')[0];
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, { payload }) => {
      const index = findItemIndex(state, payload.id);
      if (index !== -1) {
        state[index].qty += 1;
      } else {
        state.push(payload);
      }
    },
    removeItem: (state, { payload }) => {
      return state.filter((item) => item.id !== payload);
    },
    incrementCount: (state, { payload }) => {
      const index = findItemIndex(state, payload.id);
      if (index !== -1) {
        state[index].qty += 1;
      }
    },
    decrementCount: (state, { payload }) => {
      const index = findItemIndex(state, payload.id);
      if (index !== -1 && state[index].qty > 1) {
        state[index].qty -= 1;
      }
    },
    placeOrder: (state) => {
      return state.map((item) => ({
        ...item,
        orderPlaced: true,
        orderId:'ORD-112233',
        date: {date},
        status:'On The Way'
      }));
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementCount,
  decrementCount,
  placeOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
