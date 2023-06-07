import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Получаем пиццу через редакс
export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async ({ category, sortType, order, search, currentPage }) => {
    const { data } = await axios.get(
      `https://64799bb4a455e257fa636986.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  pizzas: [],
  status: '',
};

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  // обрабатываем асинхрон с редаксом fetchPizzas
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.pizzas = [];
      state.status = 'loading';
    },
    // при успешном запросе сохраняем их в стейт
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzas = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.pizzas = [];
      state.status = 'error';
    },
  },
});

export const selectPizza = (state) => state.pizzaSlice

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
