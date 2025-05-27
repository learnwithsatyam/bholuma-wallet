"use client";
import { configureStore } from "@reduxjs/toolkit";
import  walletReducer  from "@/store/walletSlice";

export const store = () => configureStore({
    reducer: {
        wallet : walletReducer,
    },         
});

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']