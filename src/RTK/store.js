import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Products.js"
export const Store = configureStore({reducer:{cartItems: ProductReducer}})