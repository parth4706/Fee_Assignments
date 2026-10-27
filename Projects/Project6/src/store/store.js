import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'

export const store = configureStore({
  reducer: { cart: cartReducer },
})

store.subscribe(() => {
  localStorage.setItem('northstar-cart', JSON.stringify(store.getState().cart.items))
})
