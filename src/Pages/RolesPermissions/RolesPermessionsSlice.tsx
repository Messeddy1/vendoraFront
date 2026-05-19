import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ACTIONS, STATUS } from "../../types/Types";
import type { Role } from "./core/Module";
import { getRolesPermissions } from "./core/_requests";

const initialState: {
  status: (typeof STATUS)[keyof typeof STATUS];
  action: (typeof ACTIONS)[keyof typeof ACTIONS];
  error: string | null;
  data: null | Role[];
  fieldErrors: Record<string, string[]> | null;
} = {
  status: STATUS.IDLE,
  action: ACTIONS.IDLE,
  error: null,
  fieldErrors: null,
  data: null,
};

const RolesPermissionsSlice = createSlice({
  initialState,
  name: "UserSessions",
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRolesPermissions.pending, (state) => {
        state.status = STATUS.PENDING;
        state.action = ACTIONS.READ;
      })
      .addCase(
        getRolesPermissions.fulfilled,
        (state, action: PayloadAction<Role[]>) => {
          const Roles = action.payload;
          state.data = Roles;
          state.status = STATUS.FULFIELD;
          state.action = ACTIONS.READ;
          state.error = null;
          state.fieldErrors = null;
        },
      )
      .addCase(
        getRolesPermissions.rejected,
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

export default RolesPermissionsSlice.reducer;
