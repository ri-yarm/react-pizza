import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  pizzas: []
}

const pizzaSlice = createSlice({
  name: 'pizzas', 
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload
    }
  }
})

export const {setPizzas} = pizzaSlice.actions

export default pizzaSlice.reducer
