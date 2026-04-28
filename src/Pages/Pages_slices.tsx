import AuthSlice from "./Auth/AuthSlice";
import UserSessionsSlice from './Profile/ProfileSlice';
export const PagesSlices = {
  auth: AuthSlice,
  userSessions:UserSessionsSlice
};
