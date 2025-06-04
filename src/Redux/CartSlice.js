import { createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, id) => state.findIndex(item => item.id === id);

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
      return state.filter(item => item.id !== payload);
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
  },
});

export const { addItem, removeItem, incrementCount, decrementCount } = cartSlice.actions;
export default cartSlice.reducer;
