import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./cors/_Modules";

const initialState = {
  user: {
    id: 0,
    name: "",
    email: "",
    password: "",
    role: "",
  },
};

const LoginSlice = createSlice({
  initialState,
  name: "Login",
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
        state.user = initialState.user;
    },
  },
});

export const { setUser, clearUser } = LoginSlice.actions;
export default LoginSlice.reducer;
