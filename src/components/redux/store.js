import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterslice';
import pizzaSlice from './slices/pizzaSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    pizzaSlice,
    cartSlice
  },
})