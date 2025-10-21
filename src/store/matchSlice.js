import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const createMatchPost = createAsyncThunk(
    'matchCreation/createPost',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState().matchCreation;
            const finalData = {
                ...state.step1_matchInfo, // { selections: [...] }
                ...state.step2_details,   // { matchFormat, gender, minLevel, maxLevel }
                ...state.step3_post,      // { title, content }
            };
            console.log('API 요청 시작. 보낼 데이터:', finalData);

            const response = await axios.post('http://localhost/api/Match/addMatch', finalData);
            return response.data;

        } catch (error) {
            console.error('API 요청 중 에러 발생:', error); 
            
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    // 1페이지: 날짜, 구장, 시간
    step1_selection: {
        selections: [], // UI에서 선택/해제를 위해 임시로 사용하는 배열
    },
    step1_matchInfo: { // 최종적으로 계산된 매치 정보를 저장할 곳
        fieldNo: null,
        matchDate: null,
        matchTime: null,
        matchEndTime: null,
    },
    // 2페이지: 레벨, 매치 방식, 성별
    step2_details: {
        minLevel: null,
        maxLevel: null,
        matchType: '6vs6',
        gender: '혼성',
    },
    // 3페이지: 게시글 내용
    step3_post: {
        title: '',
        content: '',
        userId: '',
    },
    // API 제출 상태
    status: 'idle',
    error: null,
};

const matchCreationSlice = createSlice({
    name: 'matchCreation',
    initialState,
    reducers: {
        addTimeSelection: (state, action) => {
            const existingIndex = state.step1_selection.selections.findIndex(
                sel => sel.fieldNo === action.payload.fieldNo &&
                       sel.time === action.payload.time &&
                       sel.date === action.payload.date
            );
            if (existingIndex === -1) {
                state.step1_selection.selections.push(action.payload);
            }
        },
        removeTimeSelection: (state, action) => {
            const { fieldNo, time, date } = action.payload;
            state.step1_selection.selections = state.step1_selection.selections.filter(
                sel => !(sel.fieldNo === fieldNo && sel.time === time && sel.date === date)
            );
        },
        saveStep1: (state, action) => {
            state.step1_matchInfo = action.payload;
        },
        saveStep2: (state, action) => {
            state.step2_details = action.payload;
        },
        saveStep3: (state, action) => {
            state.step3_post = action.payload;
        },
        clearForm: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
    builder
        .addCase(createMatchPost.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createMatchPost.fulfilled, (state) => {
            state.status = 'succeeded';
        })
        .addCase(createMatchPost.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
},
});

export const { addTimeSelection, removeTimeSelection, saveStep1 ,saveStep2, saveStep3, clearForm } = matchCreationSlice.actions;
export default matchCreationSlice.reducer;