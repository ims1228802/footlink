import axios from "axios";
import "../../css/team/TeamDetail.css"
import logo from "../../assets/team/team_logo.png"
import location from "../../assets/team/location_on.png"
import homeGround from "../../assets/team/home_ground.png";
import recruitTime from "../../assets/team/recruit_time.png";
import avgTime from "../../assets/team/avg_time.png";
import user from "../../assets/team/User.png";
import looksOne from "../../assets/team/looks_one.png";
import userProfile from "../../assets/team/user_profile.png";
import Layout from "../../layout/Layout";
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
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

export default function TeamDetail() {
        const urlLocation = useLocation();
        const [searchParams, setSearchParams] = useSearchParams();
        const [ data, setData ] = useState([]);
        const [ userData, setUserData ] = useState([]);
        const [ chartsData, setChartsData ] = useState([]);
        const [ calendarData, setCalendarData ] = useState([]);
        const [ button, setButton ] = useState('overview');
        const [ isModalOpen, setModalOpen ] = useState(false);
        const [ teamCode, setTeamCode ] = useState('');

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

            axios.get(`http://localhost/api/team/userInfo?teamCode=${teamCode}`)
                .then(response => {
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
                                        <img src={user} />
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
                                <button className="calendar-btn" onClick={() => openModel()}>일정추가</button>
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
                                        <div className="calendar-div" key={item.teamDateCode}>
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


    return(
         <Layout>
            <main>
                <div className="container">
                    <div className="side-div">
                        <div className="team-info">
                            <div className="team-icon">
                                <img src={logo} />
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
                        <div className="side-button">
                            <button>모집 신청 내역</button>
                            <button>초대링크 복사</button>
                            <button>팀 탈퇴하기</button>
                            <button>팀 위임하기</button>
                            <button className="team-delete">팀 삭제하기</button>
                        </div>
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
                <Calendar onClose={closeModel} teamCode={teamCode} />
            </Modal>
        </Layout>
    );
}