import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    setAuth: (state, action) => {
      state.isLoggedIn = action.payload;
    }
  },
});

export const { login, logout, setAuth } = authSlice.actions;

export default authSlice.reducer;
