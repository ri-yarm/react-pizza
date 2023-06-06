import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterslice';
import pizzaSlice from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    pizzaSlice
  },
})