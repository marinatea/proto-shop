// app/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { CartState } from 'types/types';

export interface PreloadedState {
  cart: CartState;
}
export const makeStore = (preloadedState?: PreloadedState) =>
  configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState
  });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<ReturnType<typeof makeStore>['dispatch']>;
