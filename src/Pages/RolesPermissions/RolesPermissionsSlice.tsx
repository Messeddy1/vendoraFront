import { createSlice } from "@reduxjs/toolkit";
import { ACTIONS, STATUS } from "../../types/Types";

const initialState: {
  status: (typeof STATUS)[keyof typeof STATUS];
  action: (typeof ACTIONS)[keyof typeof ACTIONS];
  error: string | null;
  data: null;
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
  name: "RolesPErmissions",
  reducers: {},
});

export default RolesPermissionsSlice.reducer;
