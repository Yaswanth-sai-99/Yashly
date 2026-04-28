import React from "react";
import {createSlice} from "@reduxjs/toolkit"

const ProductSlice = createSlice({
    name:"ProductSlice",
    initialState:{Cart:[]},
    reducers: {
        Addtocart : (state, action) =>{
            state.Cart.push(action.payload)
        },
        RemoveFromcart : (state,action) =>{
            state.Cart = state.Cart.filter(item => item.id !== action.payload.id )
        }
    }
});

export default ProductSlice.reducer;
export const {Addtocart, RemoveFromcart} = ProductSlice.actions