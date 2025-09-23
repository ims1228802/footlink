import { createSlice } from '@reduxjs/toolkit';

// 1. 초기 상태 정의
const initialState = {
    selectedFieldId: null,
    selectedTime: null,
    selectedDate: null, // 날짜도 함께 관리하면 좋습니다.
};

// 2. Slice 생성
const matchSelectionSlice = createSlice({
    name: 'matchSelection', // 슬라이스 이름
    initialState,          // 초기 상태
    reducers: {            // 리듀서 함수들
        // Action: 슬롯을 선택했을 때 실행할 함수
        selectSlot: (state, action) => {
            const { fieldId, time, date } = action.payload;
            state.selectedFieldId = fieldId;
            state.selectedTime = time;
            state.selectedDate = date;
        },
        // Action: 선택을 취소했을 때 실행할 함수
        clearSelection: (state) => {
            state.selectedFieldId = null;
            state.selectedTime = null;
            state.selectedDate = null;
        }
    }
});

// 3. Action 생성자 함수 내보내기 (컴포넌트에서 사용)
export const { selectSlot, clearSelection } = matchSelectionSlice.actions;

// 4. Reducer 내보내기 (Store 설정 파일에서 사용)
export default matchSelectionSlice.reducer;