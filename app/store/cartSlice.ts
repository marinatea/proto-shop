import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from 'types/types';

const initialState: CartState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.id !== Number(action.payload)
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    incrementQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === Number(action.payload));
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === Number(action.payload));
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
