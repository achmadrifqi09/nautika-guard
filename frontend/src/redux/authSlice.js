// redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("isLoggedIn") === "true",
  user: null,
  isAdmin: localStorage.getItem("isAdmin") === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isAdmin = false;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isAdmin");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
