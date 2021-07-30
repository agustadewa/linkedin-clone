import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        doLogin: (state, action) => {
            state.user = action.payload;
        },
        doLogout: (state) => {
            state.user = null;
        }
    }
})

export const {doLogin, doLogout} = userSlice.actions;

export default userSlice.reducer;

// Select user
export const selectUser = (state) => state.user.user;

