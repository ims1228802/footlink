import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initialState 정의
const initialState = {
    // 팀코드, 이름, 요일, 시간, 구장, 지역, 도시, 나이, 성별, 만든 사용자 아이디
    step1_team_info: {
        teamCode: '',
        teamName: '',
        stadium: '',
        city: '',
        area: '',
        gender: '',
        week: [],
        activeTime: '',
        age: '',
        userId: ''
    },
    // 팀 레벨, 데이터
    step2_team_state: {
        level: '비기너1',
        attack: 0,
        speed: 0,
        dribble: 0,
        stamina: 0,
        defense: 0,
        physical: 0,
        pass: 0,
        shot: 0
    },
    // 팀원 모집 팀코드, 구장, 지역, 도시, 나이, 레벨 
    step1_team_recruit_info: {
        teamCode: '',
        teamDistinction: '',
        stadium: '',
        city: '',
        area: '',
        age: '',
        gender: '',
        level: ''
    },
    // 작성글, 이미지
    step2_team_recruit_contents: {
        teamImg: '',
        contents: ''
    },
    // api 상태
    state: '',
    error: '',
    // button 상태
    buttonState: 'teamList'
}

//createAsyncThunk 정의
export const teamCreatePost = createAsyncThunk(
    'teamCreate/post',async (_,{ getState, rejectWithValue }) => {
        const state = getState().teamCreate;

        const field = {
            ...state.step1_team_info,
            ...state.step2_team_state
        }

        console.log('api 요청 시작');

        await axios.post('http://localhost/api/team/addTeam', field)
        .then(response=> {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error(`api 요청중 에러 발생: ${error}`);
            alert('알 수 없는 오류로 인해 등록에 실패했습니다.');

            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        });
    });

export const teamCreateRecruitPost = createAsyncThunk(
    'teamCreate/post',async (_,{ getState, rejectWithValue }) => {
        const state = getState().teamCreate;

        const field = {
            ...state.step1_team_recruit_info,
            ...state.step2_team_recruit_contents
        }

        console.log('api 요청 시작');

        await axios.post('http://localhost/api/team/addTeamRecruit', field)
        .then(response=> {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error(`api 요청중 에러 발생: ${error}`);
            alert('알 수 없는 오류로 인해 등록에 실패했습니다.');

            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        });
    });
    
export const teamEditPut = createAsyncThunk(
    'teamEdit/put',async (_,{ getState, rejectWithValue }) => {
        const state = getState().teamCreate;

        const field = {
            ...state.step1_team_info,
            ...state.step2_team_state
        }

        console.log('api 요청 시작');

        await axios.put('http://localhost/api/team/editTeam', field)
        .then(response=> {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error(`api 요청중 에러 발생: ${error}`);
            alert('알 수 없는 오류로 인해 등록에 실패했습니다.');

            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        });
    });

export const teamRecruitPut = createAsyncThunk(
    'teamEdit/put',async (_,{ getState, rejectWithValue }) => {
        const state = getState().teamCreate;

        const field = {
            ...state.step1_team_recruit_info,
            ...state.step2_team_recruit_contents
        }

        console.log('api 요청 시작');

        await axios.put('http://localhost/api/team/editTeamRecruit', field)
        .then(response=> {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error(`api 요청중 에러 발생: ${error}`);
            alert('알 수 없는 오류로 인해 등록에 실패했습니다.');

            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        });
    });

//slice 정의
const teamSlice = createSlice({
    name: 'teamCreate',
    initialState,
    reducers: {
        step1_team_info: (state, action) => {
            state.step1_team_info = action.payload;
        },
        step2_team_state: (state, action) => {
            state.step2_team_state = action.payload;
        },
        step1_team_recruit_info: (state, action) => {
            state.step1_team_recruit_info = action.payload;
        },
        step2_team_recruit_contents: (state, action) => {
            state.step2_team_recruit_contents = action.payload;
        },
        cleanForm: (state) => {
            state.step1_team_info = initialState.step1_team_info;
            state.step2_team_state = initialState.step2_team_state;
            state.step1_team_recruit_info = initialState.step1_team_recruit_info;
            state.step2_team_recruit_contents = initialState.step2_team_recruit_contents;
            state.state = initialState.state;
            state.error = initialState.error;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(teamCreatePost.pending, (state) => {
                state.state = 'loading';
            })
            .addCase(teamCreatePost.fulfilled, (state, action) => {
                state.state = 'succeeded';
            })
            .addCase(teamCreatePost.rejected, (state, action) => {
                state.state = 'failed';
                state.error = action.payload;
            })
            .addCase(teamEditPut.pending, (state) => {
                state.state = 'loading';
            })
            .addCase(teamEditPut.fulfilled, (state) => {
                state.state = 'succeeded';
            })
            .addCase(teamEditPut.rejected, (state, action) => {
                state.state = 'failed';
                state.error = action.payload;
            });
    }
});

// 액션과 리듀서를 한번에 export
export const { step1_team_info, step2_team_state, step1_team_recruit_info, step2_team_recruit_contents, cleanForm } = teamSlice.actions;
export default teamSlice.reducer;