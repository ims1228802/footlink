import { configureStore } from '@reduxjs/toolkit';
import matchCreationReducer from './matchSlice';

import teamCreateReducer from "./teamSlice";


export const store = configureStore({
  reducer: {
    matchCreation: matchCreationReducer,
    
    teamCreate: teamCreateReducer,
  },
});