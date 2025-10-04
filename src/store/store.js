import { configureStore } from '@reduxjs/toolkit';
// ✅ 1. 통합된 matchCreationSlice에서 리듀서를 가져옵니다.
import matchCreationReducer from './matchSlice';
import userReducer from "./userSlice";

// Store를 설정합니다.
export const store = configureStore({
  reducer: {
    // ✅ 2. 이제 'matchCreation'이라는 하나의 리듀서만 등록합니다.
    matchCreation: matchCreationReducer,
    user: userReducer,
  },
});