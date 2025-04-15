// redux/slices/tokenSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    access: "",
    refresh:"",
    user:""
  },
  reducers: {
    setToken: (state, action) => {
      state.access= action.payload.access;
      state.refresh= action.payload.refresh;
      state.user= action.payload.user;
    },
    clearToken: (state) => {
      state.access="";
      state.refresh= "";
      state.user= "";
    }
  }
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;

