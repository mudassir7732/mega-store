import { createSlice } from "@reduxjs/toolkit";
const initialState = {item:[{title:'', price:'', color:'', quantity:0, }]}

export const cartItemSlice=createSlice({name:'item', initialState,
  reducers:{
    add_item:(state, action)=>{
      ...state,
    }
  }
})