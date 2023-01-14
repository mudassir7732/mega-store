import { configureStore } from "@reduxjs/toolkit";
import cartItemsCounter from './reducers/counterSlice';

const store = configureStore({
  reducer:{count:cartItemsCounter}
})
export default store;