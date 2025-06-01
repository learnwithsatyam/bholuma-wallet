import React from 'react'
import { createSlice } from '@reduxjs/toolkit';

const blockchainNetworkSlice = createSlice({
    name:'blockchainNetwork',
    initialState: {
        network: 'mainnet', // Default network
    },
    reducers: {
        setNetwork(state, action) {
            state.network = action.payload;
        },
        resetNetwork(state) {
            state.network = 'mainnet'; // Reset to default network
        },
    }
});

export const {setNetwork, resetNetwork} = blockchainNetworkSlice.actions;

export default blockchainNetworkSlice.reducer