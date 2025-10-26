import search from "../../assets/team/search.png";
import "../../css/team/NewTeamRecruit.css";
import Layout from "../../layout/Layout";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { step1_team_recruit_info } from "../../store/teamSlice";
import Modal from "../../components/Modal";
import StadiumSearch from "../../components/team/StadiumSearch";
import axios from "axios";

export default function EditTeamRecruit(){

    const recruitSelector = useSelector(state => state.teamCreate.step1_team_recruit_info);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const urlLocation = useLocation();
    const [ data, setData ] = useState({});
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ recruit, setRecruit ] = useState(recruitSelector);
    const [ modalOpen, setModalOpen ] = useState(false);
    const teamCode = searchParams.get('teamCode');

    useEffect(() => {
        setSearchParams(urlLocation.search);

        axios.get(`http://localhost/api/team/recruitInfo?teamCode=${teamCode}`)
        .then(response =>{
            console.log(response.data);
            setData(response.data);
        })
        .catch(error => {
            console.error(error);
        })

    },[]);

    useEffect(() => {
        switch(data.age){
            case '10대':
                data.age = 10;
            break;
            case '20대':
                data.age = 20;
            break;
            case '30대':
                data.age = 30;
            break;
            case '40대':
                data.age = 40;
            break;
            case '50대':
                data.age = 50;
            break;
            case '60대 이상':
                data.age = 60;
            break;
        }

        switch(data.gender){
            case '남자':
                data.gender = 'man';
            break;
            case '여자':
                data.gender = 'woman';
            break;
            default:
                data.gender = 'everyone';
            break;
        }

        switch(data.level){
            case '실력무관':
                data.level = 'noneLevel';
            break;
            case '비기너':
                data.level = 'beginner';
            break;
            case '아마추어':
                data.level = 'amateur';
            break;
            case '세미프로':
                data.level = 'semiPro';
            break;
            default:
                data.level = 'pro';
            break;
        }

        const update = {
            ...recruit,
            teamCode: teamCode,
            teamDistinction: data.teamDistinction,
            age: data.age,
            gender: data.gender,
            level: data.level,
        }

        setRecruit(update);
    }, [data, setData]);

    console.log(recruit);

    const openModel = () => {
        document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
        setModalOpen(true);
    }

    const closeModel = () => {
        setModalOpen(false);
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        const update = {
            ...recruit,
            [name]: value
        }   

        setRecruit(update);
    }

    const navigateHandler = (route) => {
        navigate(`/teamDetail?teamCode=${teamCode}`);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(recruit.teamDistinction == ''){
            alert('팀 특징을 선택해주세요.');
            document.getElementById('self-war').focus();
            return;
        }

        if(recruit.age == ''){
            alert('나이를 선택해주세요.')
            document.getElementById('age-10').focus();
            return;
        }

        if(recruit.gender == ''){
            alert('성별을 선택해주세요.');
            document.getElementById('man').focus();
            return;
        }

        if(recruit.level == ''){
            alert('레벨을 선택해주세요.');
            document.getElementById('beginner').focus();
            return;
        }

        dispatch(step1_team_recruit_info(recruit));
        navigate(`/editTeamRecruitNext?teamCode=${teamCode}`, {state: {
            data: data,
        }});
    }

    return(
            <Layout>
                <form onSubmit={submitHandler}>
                    <h2>팀원 모집하기</h2>
                    <div className="date-div">
                        <div className="week-div">
                            <h2>팀 특징이 무엇인가요?</h2>
                        </div>
                        <div className="section-week">
                            <section className="checkbox-section" onChange={onChangeHandler}>
                                <input id="self-war" name="teamDistinction" type="radio" value="selfWar" checked={recruit.teamDistinction == 'selfWar' ? true : false} readOnly/>
                                <label htmlFor="self-war" className="checkbox-layout">
                                    <p>자체전 위주로 해요</p>
                                </label>
                                <input id="tournament" name="teamDistinction" type="radio" value="tournament" checked={recruit.teamDistinction == 'tournament' ? true : false} readOnly/>
                                <label htmlFor="tournament" className="checkbox-layout">
                                    <p>대회를 준비해요</p>
                                </label>
                                <input id="team-match" name="teamDistinction" type="radio" value="teamMatch" checked={recruit.teamDistinction == 'teamMatch' ? true : false} readOnly/>
                                <label htmlFor="team-match" className="checkbox-layout">
                                    <p>팀 매칭 위주로 해요</p>
                                </label>
                                <input id="together" name="teamDistinction" type="radio" value="together" checked={recruit.teamDistinction == 'together' ? true : false} readOnly/>
                                <label htmlFor="together" className="checkbox-layout">
                                    <p>함께 실력을 키워요</p>
                                </label>
                                <input id="coach" name="teamDistinction" type="radio" value="coach" checked={recruit.teamDistinction == 'coach' ? true : false} readOnly/>
                                <label htmlFor="coach" className="checkbox-layout">
                                    <p>전문 코치님이 있어요</p>
                                </label>
                            </section>
                        </div>
                    </div>
                    <div className="peoples-div">
                        <h2>어떤 사람들을 모집하실건가요?</h2>
                        <div className="age-div">
                            <p>주요 나이대</p>
                            <section className="checkbox-section" onChange={onChangeHandler}>
                                <input type="radio" id="age-10" name="age" value={10} checked={recruit.age == 10} readOnly/>
                                <label htmlFor="age-10" className="checkbox-layout">
                                    <p>10대</p>
                                </label>
                                <input type="radio" id="age-20" name="age" value={20} checked={recruit.age == 20} readOnly/>
                                <label htmlFor="age-20" className="checkbox-layout">
                                    <p>20대</p>
                                </label>
                                <input type="radio" id="age-30" name="age" value={30} checked={recruit.age == 30} readOnly/>
                                <label htmlFor="age-30" className="checkbox-layout">
                                    <p>30대</p>
                                </label>
                                <input type="radio" id="age-40" name="age" value={40} checked={recruit.age == 40} readOnly/>
                                <label htmlFor="age-40" className="checkbox-layout">
                                    <p>40대</p>
                                </label>
                                <input type="radio" id="age-50" name="age" value={50} checked={recruit.age == 50} readOnly/>
                                <label htmlFor="age-50" className="checkbox-layout">
                                    <p>50대</p>
                                </label>
                                <input type="radio" id="age-60" name="age" value={60} checked={recruit.age == 60} readOnly/>
                                <label htmlFor="age-60" className="checkbox-layout">
                                    <p>60대 이상</p>
                                </label>
                            </section>
                        </div>
                        <div className="gender-div">
                            <p>성별</p>
                            <section className="checkbox-section" onChange={onChangeHandler}>
                                <input type="radio" id="man" name="gender" value="man" checked={recruit.gender == 'man'} readOnly/>
                                <label htmlFor="man" className="checkbox-layout-gender" >
                                    <p>남</p>
                                </label>
                                <input type="radio" id="woman" name="gender" value="woman" checked={recruit.gender == 'woman'} readOnly/>
                                <label htmlFor="woman" className="checkbox-layout-gender" >
                                    <p>여</p>
                                </label>
                                <input type="radio" id="everyone" name="gender" value="everyone" checked={recruit.gender == 'everyone'} readOnly/>
                                <label htmlFor="everyone" className="checkbox-layout-gender" >
                                    <p>남녀모두</p>
                                </label>
                            </section>
                        </div>
                        <div className="level-div">
                            <p>레벨</p>
                            <section className="checkbox-section" onChange={onChangeHandler}>
                                <input id="none-level" name="level" type="radio" value="noneLevel" checked={recruit.level == 'noneLevel'} readOnly/>
                                <label htmlFor="none-level" className="checkbox-layout">
                                    <p>실력무관</p>
                                </label>
                                <input id="beginner" name="level" type="radio" value="beginner" checked={recruit.level == 'beginner'} readOnly/>
                                <label htmlFor="beginner" className="checkbox-layout">
                                    <p>비기너</p>
                                </label>
                                <input id="amateur" name="level" type="radio" value="amateur" checked={recruit.level == 'amateur'} readOnly/>
                                <label htmlFor="amateur" className="checkbox-layout">
                                    <p>아마추어</p>
                                </label>
                                <input id="semi-pro" name="level" type="radio" value="semiPro" checked={recruit.level == 'semiPro'} readOnly/>
                                <label htmlFor="semi-pro" className="checkbox-layout">
                                    <p>세미프로</p>
                                </label>
                                <input id="pro" name="level" type="radio" value="pro" checked={recruit.level == 'pro'} readOnly/>
                                <label htmlFor="pro" className="checkbox-layout">
                                    <p>프로</p>
                                </label>
                            </section>
                        </div>
                        <div className="button-div">
                            <button type="button" className="outline-btn" onClick={() => navigateHandler('pre')}>이전으로</button>
                            <button type="submit" className="fill-btn">다음으로</button>
                        </div>
                    </div>
                    <Modal isOpen={modalOpen} onClose={closeModel}>
                        <StadiumSearch team={recruit} setTeam={setRecruit} onClose={closeModel}/>
                    </Modal>
                </form>
            </Layout>
    );
}