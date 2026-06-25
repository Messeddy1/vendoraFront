import AuthSlice from "./Auth/AuthSlice";
import UserSessionsSlice from "./Profile/ProfileSlice";
import RolesPermissionsSlice from "./RolesPermissions/RolesPermessionsSlice";
import CategoriesSlice from "./Categories/CategoriesSlice";

export const PagesSlices = {
  auth: AuthSlice,
  userSessions: UserSessionsSlice,
  RolesPermissions: RolesPermissionsSlice,
  categories: CategoriesSlice,
};

