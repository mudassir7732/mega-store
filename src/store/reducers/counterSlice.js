import { createSlice } from "@reduxjs/toolkit";
const initialState = {counter:0};

export const cartItemsCounter = createSlice({name:'count', initialState,
  reducers:{
    increase_counter:(state, action)=>{
      state.counter+=1,
      console.log('In Reducer counter = ', state.counter)
    },
    decrease_counter:(state, action)=>{
      state.counter-=1
    }
  }
})

export const {increase_counter, decrease_counter} = cartItemsCounter.actions;
export default cartItemsCounter.reducer;