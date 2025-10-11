import { configureStore } from '@reduxjs/toolkit';
import matchCreationReducer from './matchSlice';
import userReducer from "./userSlice";
import teamCreateReducer from "./teamSlice";


export const store = configureStore({
  reducer: {
    matchCreation: matchCreationReducer,
    user: userReducer,
    teamCreate: teamCreateReducer,
  },
});