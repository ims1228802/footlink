import "../../css/team/NewTeamNext.css";
import "../../css/team/NewTeamRecruitNext.css";
import Layout from "../../layout/Layout";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { step2_team_recruit_contents, cleanForm, teamRecruitPut } from "../../store/teamSlice";

export default function EditTeamRecruitNext() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const teamCode = searchParams.get('teamCode');
    const state = useSelector(state => state.teamCreate.state);
    const recruitContents = useSelector(state => state.teamCreate.step2_team_recruit_contents);
    const [ contents, setContents ] = useState(recruitContents);
    const data = location.state.data;

    console.log(data);
    console.log(contents);

    useEffect(() => {
        const update = {
            ...contents,
            contents: data.contents,
        }

        setContents(update);
    },[]);

    useEffect(() => {
        console.log(state);

        if(state == 'succeeded'){
            dispatch(cleanForm());
            navigateHandler('next');
        }else if(state == "failed"){
            alert('알 수 없는 오류로 인해 등록에 실패했습니다.');
        }else{
            console.log('로딩중...');
        }
    },[dispatch, state]);

    const navigateHandler = (route) => {
        if(route == 'pre'){
            navigate(`/editTeamRecruit?teamCode=${teamCode}`);
        }else{
            navigate(`/teamDetail?teamCode=${teamCode}`);
        }
    }

    const onChangeHandler = (e) => {
        const update = {
            ...contents,
            contents: e.target.value
        }

        setContents(update);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(step2_team_recruit_contents(contents));
        console.log(recruitContents);
        dispatch(teamRecruitPut());
    }

    return(
        <Layout>
        <form onSubmit={onSubmitHandler}>
            <div className="recruit-text">
                <h2>팀원 모집하기</h2>
                <p>우리팀을 소개해주세요.</p>
            </div>
            <div className="recruit-div">
                <div className="recruit-select-button">
                    <button type="button" className="recruit-img-btn" onClick={() => alert('준비중 입니다.')}>팀 단체사진 추가</button>
                </div>
            </div>
            <div className="recruit-content">
                <textarea value={contents.contents} onChange={onChangeHandler}/>
            </div>
            <div className="recruit-info">
                <h2>이런 내용이 포함되어 있으면 좋아요!</h2>
                <ul>
                    <li>· 주로 활동하는 구장</li>
                    <li>· 현재 멤버 수</li>
                    <li>· 스케줄 구성</li>
                    <li>· 가입 절차</li>
                </ul>
            </div>
            <div className="button-div">
                <button type="button" className="outline-btn" onClick={() => navigateHandler('pre')}>이전으로</button>
                <button type="submit" className="fill-btn">수정하기</button>
            </div>
        </form>
        </Layout>
    );
}