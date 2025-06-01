"use client";
import { configureStore } from "@reduxjs/toolkit";
import  walletReducer  from "@/store/walletSlice";
import blockchainNetworkReducer from "@/store/blockchainNetworkSlice";

export const store = () => configureStore({
    reducer: {
        wallet : walletReducer,
        blockchainNetwork: blockchainNetworkReducer,
    },         
});

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']