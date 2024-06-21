import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    //mutating the state over here directly
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.pop(); //it will remove only 1 item form the end of cart
    },
    clearCart: (state) => {
      state.items.length = 0; //it will make the array empty
    },
  },
});

//exported actions
export const { addItem, removeItem, clearCart } = cartSlice.actions;

//exported reducer
export default cartSlice.reducer;
