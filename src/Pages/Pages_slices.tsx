import AuthSlice from "./Auth/AuthSlice";
import UserSessionsSlice from "./Profile/ProfileSlice";
import RolesPermissionsSlice from "./RolesPermissions/RolesPermessionsSlice";
export const PagesSlices = {
  auth: AuthSlice,
  userSessions: UserSessionsSlice,
  RolesPermissions: RolesPermissionsSlice,
};
