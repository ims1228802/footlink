import { configureStore } from '@reduxjs/toolkit';
import matchSelectionReducer from './matchSlice.js'; // 이전에 만든 슬라이스의 리듀서를 가져옵니다.

// Store를 설정합니다.
export const store = configureStore({
  // reducer 객체에 각 기능별 reducer를 등록합니다.
  // 여기에 등록된 이름(예: matchSelection)이 useSelector에서 state를 조회할 때 사용됩니다.
  reducer: {
    matchSelection: matchSelectionReducer,
    // user: userReducer, <-- 만약 다른 기능(예: 유저 정보) 슬라이스가 있다면 여기에 추가합니다.
    // post: postReducer, <-- 게시물 관련 슬라이스 등
  },
});