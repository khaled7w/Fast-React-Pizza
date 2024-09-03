import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //payload:item
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload:pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantity(state, action) {
      //payload:pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseQuantity(state, action) {
      //payload:pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearItems(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearItems,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((pre, cur) => pre + cur.totalPrice, 0);

export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((pre, cur) => pre + cur.quantity, 0);

export const getQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
