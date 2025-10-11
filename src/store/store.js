import { configureStore } from '@reduxjs/toolkit';
import matchCreationReducer from './matchSlice';
import userReducer from "./userSlice";


export const store = configureStore({
  reducer: {
    matchCreation: matchCreationReducer,
    user: userReducer,
  },
});