import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ACTIONS, STATUS } from "../../types/Types";
import { getUserInfo, login, logout, register } from "./cors/_request";
import type { User } from "./cors/_Modules";

const initialState: {
  status: (typeof STATUS)[keyof typeof STATUS];
  action: (typeof ACTIONS)[keyof typeof ACTIONS];
  error: string | null;
  user: null | User;
  fieldErrors: Record<string, string[]> | null;
} = {
  status: STATUS.IDLE,
  action: ACTIONS.IDLE,
  error: null,
  fieldErrors: null,
  user: null,
};

const AuthSlice = createSlice({
  initialState,
  name: "Auth",
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = STATUS.PENDING;
        state.action = ACTIONS.READ;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = STATUS.FULFIELD;
        state.action = ACTIONS.READ;
        state.error = null;
        state.fieldErrors = null;
      })
      .addCase(login.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = STATUS.REJECTED;
        state.action = ACTIONS.READ;
        state.error =
          (action.payload as { message: string }).message || "Login failed";
        state.fieldErrors =
          (action.payload as { errors: Record<string, string[]> }).errors ||
          null;
      })
      // register
      .addCase(register.pending, (state) => {
        state.status = STATUS.PENDING;
        state.action = ACTIONS.CREATE;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = STATUS.FULFIELD;
        state.action = ACTIONS.CREATE;
        state.error = null;
        state.fieldErrors = null;
      })
      .addCase(register.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = STATUS.REJECTED;
        state.action = ACTIONS.CREATE;
        state.error =
          (action.payload as { message: string }).message ||
          "Registration failed";
        state.fieldErrors =
          (action.payload as { errors: Record<string, string[]> }).errors ||
          null;
      })
      // get user info
      .addCase(getUserInfo.pending, (state) => {
        state.status = STATUS.PENDING;
        state.action = ACTIONS.READ;
      })
      .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = STATUS.FULFIELD;
        state.action = ACTIONS.READ;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.user = null;
        state.status = STATUS.REJECTED;
        state.action = ACTIONS.READ;
      })
      .addCase(logout.pending, (state) => {
        state.status = STATUS.PENDING;
        state.action = ACTIONS.READ;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = STATUS.FULFIELD;
        state.user = null;
        state.action = ACTIONS.READ;
      })
      .addCase(logout.rejected, (state) => {
        state.status = STATUS.REJECTED;
        state.action = ACTIONS.READ;
      });
  },
});

export default AuthSlice.reducer;
