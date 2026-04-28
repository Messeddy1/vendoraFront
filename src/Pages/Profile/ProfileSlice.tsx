import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ACTIONS, STATUS } from "../../types/Types";
import { getuserSessions, logoutAllSession, logoutSession } from "../Profile/cors/_requests";
import type { UserSessionInterface } from "./cors/_modules";

const initialState: {
  status: (typeof STATUS)[keyof typeof STATUS];
  action: (typeof ACTIONS)[keyof typeof ACTIONS];
  error: string | null;
  sessions: null | UserSessionInterface[];
  fieldErrors: Record<string, string[]> | null;
} = {
  status: STATUS.IDLE,
  action: ACTIONS.IDLE,
  error: null,
  fieldErrors: null,
  sessions: null,
};

const UserSessionsSlice = createSlice({
  initialState,
  name: "UserSessions",
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getuserSessions.pending, (state) => {
        state.status = STATUS.PENDING;
        state.action = ACTIONS.READ;
      })
      .addCase(
        getuserSessions.fulfilled,
        (state, action: PayloadAction<UserSessionInterface[]>) => {
          const sessions = action.payload;
          state.sessions = sessions;
          state.status = STATUS.FULFIELD;
          state.action = ACTIONS.READ;
          state.error = null;
          state.fieldErrors = null;
        },
      )
      .addCase(
        getuserSessions.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.status = STATUS.REJECTED;
          state.action = ACTIONS.READ;
          state.error =
            (action.payload as { message: string }).message || "Update failed";
          state.fieldErrors =
            (action.payload as { errors: Record<string, string[]> }).errors ||
            null;
        },
      );
       builder
      .addCase(logoutSession.pending, (state) => {
        state.status = STATUS.PENDING;
        state.action = ACTIONS.READ;
      })
      .addCase(
        logoutSession.fulfilled,
        (state, action: PayloadAction<UserSessionInterface[]>) => {
          const sessions = action.payload;
          state.sessions = sessions;
          state.status = STATUS.FULFIELD;
          state.action = ACTIONS.READ;
          state.error = null;
          state.fieldErrors = null;
        },
      )
      .addCase(
        logoutSession.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.status = STATUS.REJECTED;
          state.action = ACTIONS.READ;
          state.error =
            (action.payload as { message: string }).message || "Update failed";
          state.fieldErrors =
            (action.payload as { errors: Record<string, string[]> }).errors ||
            null;
        },
      );
       builder
      .addCase(logoutAllSession.pending, (state) => {
        state.status = STATUS.PENDING;
        state.action = ACTIONS.READ;
      })
      .addCase(
        logoutAllSession.fulfilled,
        (state, action: PayloadAction<UserSessionInterface[]>) => {
          const sessions = action.payload;
          state.sessions = sessions;
          state.status = STATUS.FULFIELD;
          state.action = ACTIONS.READ;
          state.error = null;
          state.fieldErrors = null;
        },
      )
      .addCase(
        logoutAllSession.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.status = STATUS.REJECTED;
          state.action = ACTIONS.READ;
          state.error =
            (action.payload as { message: string }).message || "Update failed";
          state.fieldErrors =
            (action.payload as { errors: Record<string, string[]> }).errors ||
            null;
        },
      );
  },
});

export default UserSessionsSlice.reducer;
