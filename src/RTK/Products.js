import React from "react";
import {createSlice} from "@reduxjs/toolkit"

const ProductSlice = createSlice({
    name:"ProductSlice",
    initialState:{Cart:[]},
    reducers: {
        Addtocart : (state, action) =>{
            const ExistingItem = state.Cart.find(item => item.id === action.payload.id);
            if(ExistingItem){
                ExistingItem.quantity += 1;
            }else{
                state.Cart.push({...action.payload, quantity:1});
            }
        },
        incrementQty :(state, action)=>{
            const item = state.Cart.find(item => item.id === action.payload.id);
            if(item){
                item.quantity +=1
            }
        },
        decrementQty : (state,action)=>{
            const item = state.Cart.find(item => item.id === action.payload.id);
            if(item && item.quantity >1){
                item.quantity -= 1;
            }else{
                state.Cart = state.Cart.filter(item => item.id !== action.payload.id)
            };
        },
        RemoveFromcart : (state,action) =>{
            state.Cart = state.Cart.filter(item => item.id !== action.payload.id )
        }
    }
});

export default ProductSlice.reducer;
export const {Addtocart, RemoveFromcart ,incrementQty ,decrementQty} = ProductSlice.actions