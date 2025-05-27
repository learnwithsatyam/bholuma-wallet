"use client"
import React from 'react'
import {createSlice} from '@reduxjs/toolkit';

const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        address: '',
        privateKey: '',
    },
    reducers: {
        setAddress(state, action) {
            state.address = action.payload;
        },
        setPrivateKey(state, action) {
            state.privateKey = action.payload;
        },
    },
})

export const {setAddress, setPrivateKey} = walletSlice.actions;
export default walletSlice.reducer;