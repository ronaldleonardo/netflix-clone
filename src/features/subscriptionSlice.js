import { createSlice } from '@reduxjs/toolkit';

export const subscriptionSlice = createSlice({
    name: 'subscriptionCheck',
    initialState: {
        subscriptionCheck: null,
    },

    reducers: {
        subscribed: (state, action) => {
            state.subscriptionCheck = action.payload;
        },
        unsubscribed: (state, action) => {
            state.subscriptionCheck = null;
        }
    },
});

export const { subscribed, unsubscribed } = subscriptionSlice.actions;

export const selectSubscription = (state) => state.subscriptionCheck.subscriptionCheck;

export default subscriptionSlice.reducer;