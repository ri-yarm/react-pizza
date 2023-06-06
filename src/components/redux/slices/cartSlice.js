import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    /* addPizza(state, action) {
      // добавляем элемет в корзину и сразу высчитываем итоговую стоимость
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((acc, el) => el.price + acc , 0)
    }, */
    addPizza(state, action) {
      const findItem = state.items.find((el) => el.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce(
        (acc, el) => el.price * el.count + acc,
        0
      );
    },
    decrementPizza(state, action) {
      const findItem = state.items.find((el) => el.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
    },
    removePizza(state, action) {
      state.items = state.items.filter((el) => el.id !== action.payload);
    },
    clearAll(state, action) {
      state.items = [];
      state.totalPrice = 0
    },
  },
});

export const { addPizza, removePizza, clearAll, decrementPizza } = cartSlice.actions;

export default cartSlice.reducer;
