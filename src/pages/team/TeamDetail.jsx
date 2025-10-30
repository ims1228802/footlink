import axios from "axios";
import "../../css/team/TeamDetail.css"
import logo from "../../assets/team/team_logo.png"
import location from "../../assets/team/location_on.png"
import homeGround from "../../assets/team/home_ground.png";
import recruitTime from "../../assets/team/recruit_time.png";
import avgTime from "../../assets/team/avg_time.png";
import userImg from "../../assets/team/User.png";
import looksOne from "../../assets/team/looks_one.png";
import userProfile from "../../assets/team/user_profile.png";
import Layout from "../../layout/Layout";
import { useUser } from '../../hooks/useUser';
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { option } from "../../data/team/chart.js";
import { Radar } from "react-chartjs-2";
import { 
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
    } from "chart.js";
import Modal from "../../components/Modal.jsx";
import Calendar from "../../components/team/Calendar.jsx";
import CalendarDetail from "../../components/team/CalendarDetail.jsx";

export default function TeamDetail() {
        const urlLocation = useLocation();
        const { data: user, isLoading } = useUser();
        const [searchParams, setSearchParams] = useSearchParams();
        const [ data, setData ] = useState([]);
        const [ userData, setUserData ] = useState([]);
        const [ chartsData, setChartsData ] = useState([]);
        const [ calendarData, setCalendarData ] = useState([]);
        const [ button, setButton ] = useState('overview');
        const [ isModalOpen, setModalOpen ] = useState(false);
        const [ teamCode, setTeamCode ] = useState('');
        const [ recruitCount, setRecruitCount ]  = useState(0);
        const [ selectModal, setSelectModal ] = useState('');
        const [ teamDateCode, setTeamDateCode ] = useState('');
        const navigator = useNavigate();

        let isUser = false;
        let author = '';

        useEffect(() => {
            setSearchParams(urlLocation.search);
            const teamCode = searchParams.get('teamCode');
            setTeamCode(teamCode);

            axios.get(`http://localhost/api/team/teamDetail?teamCode=${teamCode}`)
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.log(`Error feching data: ${error}`);
            });

            axios.get(`http://localhost/api/team/teamRecruitCnt?teamCode=${teamCode}`)
                .then(response => {
                    setRecruitCount(response.data);
                })
                .catch(error => {
                    console.log(`Error feching data: ${error}`);
            });

            axios.get(`http://localhost/api/team/userInfo?teamCode=${teamCode}`)
                .then(response => {
                    //console.log(response.data);
                    setUserData(response.data);
                })
                .catch(error => {
                    console.log(`Error feching data: ${error}`);
            });

            axios.get(`http://localhost/api/team/states?teamCode=${teamCode}`)
                .then(response => {
                    setChartsData(response.data);
                })
                .catch(error => {
                    console.log(`Error feching data: ${error}`);
            });

            axios.get(`http://localhost/api/team/calendar?teamCode=${teamCode}`)
                .then(response => {
                    //console.log(response.data);
                    setCalendarData(response.data);
                })
                .catch(error => {
                    console.log(`Error feching data: ${error}`);
            });
        },[]);

        // 날짜, 시간 포맷 설정
        const reduceDate = calendarData.reduce((acc, item) => {
            const calendarDate = new Date(item.date);
            const month = calendarDate.getMonth() + 1;
            const day = calendarDate.getDate();

            const dateText = `${month}월 ${day}일`;

            const regex = /^(\d{2}:\d{2}):\d{2}$/;
            const startTime = item.startTime.replace(regex, '$1');
            const endTime = item.endTime.replace(regex, '$1');

            item.startTime = startTime;
            item.endTime = endTime;

            if(!acc[dateText]){
                acc[dateText] = [];
            }
            
            acc[dateText].push(item);

            return acc;
        },{});

        ChartJS.register(
            RadialLinearScale,
            PointElement,
            LineElement,
            Filler,
            Tooltip,
            Legend
        );

        const chartData = {
            labels: ['공격','스피드','드리블','체력','방어','피지컬','패스','슛'],
            datasets: [
                {
                    label: '',
                    data: [
                            chartsData.attack,
                            chartsData.speed, 
                            chartsData.dribble, 
                            chartsData.stamina,
                            chartsData.defense, 
                            chartsData.physical, 
                            chartsData.pass, 
                            chartsData.shot, 
                        ],
                    fill: true,     //선 안쪽 색상 채워짐
                    backgroundColor: 'rgba(0,173,181,0.6)',   // 선 안쪽 색상
                    pointRadius: 0,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#545455'
                }
            ],
        }

        if(user){
            userData.forEach(item => {
                if(item.userId == user.id){
                    isUser = true;
                    author = item.teamAuthrtName;
                    //console.log(author);
                }
            });
        }

        const openModel = (select, code) => {
            document.body.style.cssText = `
            position: fixed;
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;
            setSelectModal(select);
            setTeamDateCode(code);
            setModalOpen(true);
        }

        const closeModel = () => {
            setModalOpen(false);
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        }

        const onClickHandler = (select, code) => {
            switch(select){
                case 'recruit':
                    navigator(`/newTeamRecruit?teamCode=${teamCode}`);
                break;
                case 'recruitEdit':
                    navigator(`/editTeamRecruit?teamCode=${teamCode}`);
                break;
                case 'recruitEnd':
                    if(confirm('팀원 모집을 종료하시겠습니까?')){
                        axios.delete('http://localhost/api/team/deleteRecruit', {
                            params: {
                                teamCode: teamCode,
                            }
                        })
                        .then(response => {
                            alert('모집이 종료되었습니다.');
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.error(error);
                        })
                    }
                break;
                case 'teamEdit':
                    navigator(`/editTeam`, 
                        {state: {
                            data: data, 
                            chartData: chartData, 
                        }
                    });
                break;
                case 'teamDelete':
                    if(confirm('정말로 팀을 삭제하시겠습니까?')){
                        axios.put('http://localhost/api/team/deleteTeam', {
                            params: {
                                teamCode: teamCode
                            }
                        })
                        .then(response => {
                            alert('팀 삭제가 완료되었습니다.')
                            console.log(response.data);
                            navigator('/teamList');
                        })
                        .catch(error => {
                            console.error(error);
                        });
                        // console.log('팀 삭제 완료');
                    }
                break;
                case 'outTeam':
                    if(author == '팀장'){
                        alert('팀장은 탈퇴할 수 없습니다.');
                        return;
                    }

                    if(confirm('정말로 팀을 탈퇴하시겠습니까?')){
                        axios.delete('http://localhost/api/team/outTeam', {
                            params: {
                                teamCode: teamCode,
                                user: user.id
                            }
                        })
                        .then(response => {
                            alert('팀 탈퇴가 완료되었습니다');
                            console.log(response.data);
                            navigator('/teamList');
                        })
                        .catch(error => {
                            console.error(error);
                        });
                        // console.log('팀 삭제 완료');
                    }
                break;
                case 'joinTeam':
                    if(recruitCount == 0){
                        alert('모집중인 팀이 아닙니다.');
                        return;
                    }


                break;
                case 'deleteCalendar':
                    if(confirm('해당 일정을 삭제하시겠습니까?')){
                        axios.delete(`http://localhost/api/team/deleteCalendar?teamDateCode=${code}`)
                        .then(response => {
                            alert('일정이 삭제되었습니다.');
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.error(error);
                        })
                    }
                break;
            }
        }
        
        const Content = () => {
            switch(button){
                case 'overview':
                    return(
                        <>
                            <div className="team-member">
                                <div className="profile-title">
                                    <p>주요멤버</p>
                                    <p className="member-view" onClick={() => setButton('member')}>전체보기</p>
                                </div>
                                {userData.map((item, idx) => idx < 3 ? (
                                    <div className="profile-user" key={item.name}>
                                        <div className="profile-img">
                                            <img src={userProfile}/>
                                        </div>
                                        <div className="profile-text">
                                            <p>{item.name}</p>
                                            <p>{item.level}</p>
                                        </div>
                                    </div>
                                ) : undefined)}
                            </div>
                            <p>팀 정보</p>
                            <div className="content-info">
                                <div className="info-div">
                                    <div className="img-icon">
                                        <img src={location} />
                                        <p>지역</p>
                                    </div>
                                    {data.regionName}
                                </div>
                                <div className="info-div">
                                    <div className="img-icon">
                                        <img src={homeGround} />
                                        <p>홈 구장</p>
                                    </div>
                                    {data.stadium}
                                </div>
                                <div className="info-div">
                                    <div className="img-icon">
                                        <img src={recruitTime} />
                                        <p>모임 시간</p>
                                    </div>
                                    {data.activeDoWeek} {data.meetingTime}
                                </div>
                                <div className="info-div">
                                    <div className="img-icon">
                                        <img src={avgTime} />
                                        <p>평균 나이</p>
                                    </div>
                                    {data.teamAge}
                                </div>
                                <div className="info-div">
                                    <div className="img-icon">
                                        <img src={userImg} />
                                        <p>멤버</p>
                                    </div>
                                    {data.userCount} 명
                                </div>
                                <div className="info-div">
                                    <div className="img-icon">
                                        <img src={looksOne} />
                                        <p>레벨</p>
                                    </div>
                                    {data.level}
                                </div>
                            </div>
                            <div className="chart-div">
                                <Radar data={chartData} options={option} />
                            </div>
                        </>
                    )
                case 'calendar':
                    return(
                        <div className="team-member">
                            <div className="profile-title">
                                <p>일정</p>
                                <button className="calendar-btn" onClick={() => openModel('newCalendar')}>일정추가</button>
                            </div>
                            <div className="calendar-box">
                                <p>8월 3일</p>
                                <div className="calendar-div">
                                    <div className="time-state">
                                        <p>21:00</p>
                                        <div className="complete">
                                            <span>완료</span>
                                        </div>
                                    </div>
                                    <div className="calendar-info">
                                        <div className="calendar-title">
                                            <span>전주 삼잇풋살장 A구장</span>
                                            <div className="stadium-info">
                                                <span>남</span>
                                            </div>
                                            <div className="stadium-info">
                                                <span>6 vs 6</span>
                                            </div>
                                        </div>
                                        <div className="calendar-level">
                                            <span>모집레벨: 아마추어5 - 세미프로2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {Object.keys(reduceDate).map((date) => Object.keys(reduceDate).length > 0 ? (
                                <div className="calendar-box">
                                    <p>{date}</p>
                                    {reduceDate[date].map(item => (
                                        <div className="calendar-div" key={item.teamDateCode} onClick={() => openModel('calendarDetail', item.teamDateCode)}>
                                            <div className="time-state">
                                                <p>{item.startTime}</p>
                                            </div>
                                            <div className="calendar-info">
                                                <div className="calendar-title">
                                                    <span>{item.placeName}</span>
                                                </div>
                                                <div className="calendar-level">
                                                    <span>진행시간: {item.startTime} - {item.endTime}</span>
                                                </div>
                                            </div>
                                            {author == '팀관리자' || author == '팀장' ? (
                                            <div>
                                                <button type="button" className="delete-btn" onClick={() => onClickHandler('deleteCalendar', item.teamDateCode)}>일정 삭제</button>
                                            </div>
                                        ) : undefined}
                                        </div>
                                    ))}
                                </div>
                            ) : '일정 목록이 존재하지 않습니다.')}
                        </div>
                    )
                case 'member':
                    return(
                        <div className="team-member">
                            <div className="profile-title">
                                <p>멤버</p>
                            </div>
                            {userData.map((item) => (
                                <div className="profile-user">
                                    <div className="profile-img">
                                        <img src={userProfile}/>
                                    </div>
                                    <div className="profile-text">
                                        <p>{item.name}</p>
                                        <p>{item.level}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
            }
        }

    const ModalContent = () => {
        switch(selectModal){
            case 'newCalendar':
                return(
                    <Calendar onClose={closeModel} teamCode={teamCode} />
                )
            case 'calendarDetail':
                return(
                    <CalendarDetail onClose={closeModel} teamDateCode={teamDateCode}/>
                )
        }
    }


    return(
         <Layout>
            <main>
                <div className="container">
                    <div className="side-div">
                        <div className="team-info">
                            <div className="team-icon">
                                <img src={data.teamImage ? data.teamImage : logo} />
                            </div>
                            <div className="team-text">
                                <p>{data.teamName}</p>
                                <div className='team-area'>
                                    <span>{data.regionName}</span>
                                    <span>{data.stadium}</span>
                                </div>
                                <div className='team-details'>
                                    <span>{data.gender}</span>
                                    <span>{data.teamAge}</span>
                                    <span>{data.activeDoWeek} {data.meetingTime}</span>
                                    <span>{data.level}</span>
                                </div>
                            </div>
                        </div>
                        {user ? 
                        (<div className="side-button">
                            {isUser ? (
                                <>
                                    <button type="button" onClick={() => alert('기능 준비중입니다.')}>초대링크 복사</button>
                                    <button type="button" onClick={() => onClickHandler('outTeam')}>팀 탈퇴하기</button>
                                    {author == '팀장' ? <button type="button">팀 위임하기</button> : undefined}
                                    {(author == '팀장' || author == '팀관리자') ? (
                                    <>
                                        <button type="button">모집 신청 내역</button>
                                        {recruitCount > 0 ? (
                                            <>
                                                <button type="button" onClick={() => onClickHandler('recruitEdit')}>모집 수정하기</button>
                                                <button type="button" onClick={() => onClickHandler('recruitEnd')}>모집 종료하기</button>
                                            </>
                                            ) : <button type="button" onClick={() => onClickHandler('recruit')}>팀원 모집하기</button>}
                                        <button type="button" onClick={() => onClickHandler('teamEdit')}>팀 정보 수정하기</button>
                                    </>
                                    ) : undefined }
                                    {author == '팀장' ? <button type="button" className="team-delete" onClick={() => onClickHandler('teamDelete')}>팀 삭제하기</button> : undefined}  
                                </>
                            ) : (
                                <>
                                    <button type="button" onClick={() => onClickHandler('joinTeam')}>가입 신청하기</button>
                                </>
                            )}
                        </div>) : undefined}
                    </div>
                    <div className="contents-div">
                        <nav>
                            <ul>
                                <li>
                                    <button className={button == 'overview' ? 'underline-btn active-btn' : 'underline-btn'} onClick={() => setButton('overview')}>오버뷰</button>
                                </li>
                                <li>
                                    <button className={button == 'calendar' ? 'underline-btn active-btn' : 'underline-btn'} onClick={() => setButton('calendar')}>일정</button>
                                </li>
                                <li>
                                    <button className={button == 'member' ? 'underline-btn active-btn' : 'underline-btn'} onClick={() => setButton('member')}>멤버</button>
                                </li>
                            </ul>
                        </nav>
                        <Content />
                    </div>
                </div>
            </main>
            <Modal isOpen={isModalOpen} onClose={closeModel}>
                <ModalContent />
            </Modal>
        </Layout>
    );
}