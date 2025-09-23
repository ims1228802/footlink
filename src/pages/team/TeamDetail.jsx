import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../css/team/TeamDetail.css"
import logo from "../../assets/team/team_logo.png"
import location from "../../assets/team/location_on.png"
import homeGround from "../../assets/team/home_ground.png";
import recruitTime from "../../assets/team/recruit_time.png";
import avgTime from "../../assets/team/avg_time.png";
import user from "../../assets/team/User.png";
import looksOne from "../../assets/team/looks_one.png";
import userProfile from "../../assets/team/user_profile.png";

export default function TeamDetail() {
    return(
        <>
            <Header />
            <main>
                <div className="container">
                    <div className="side-div">
                        <div className="team-info">
                            <div className="team-icon">
                                <img src={logo} />
                            </div>
                            <div className="team-text">
                                <p>스마트풋살</p>
                                <div className='team-area'>
                                    <span>전북 전주시</span>
                                    <span>전주 두잇 풋살장</span>
                                </div>
                                <div className='team-details'>
                                    <span>남녀모두</span>
                                    <span>20대</span>
                                    <span>매일 점심</span>
                                    <span>비기너 1</span>
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
                                <li>오버뷰</li>
                                <li>일정</li>
                                <li>멤버</li>
                            </ul>
                        </nav>
                        <div className="team-member">
                            <div className="profile-title">
                                <p>주요멤버</p>
                                <p className="member-view">전체보기</p>
                            </div>
                            <div className="profile-user">
                                <div className="profile-img">
                                    <img src={userProfile}/>
                                </div>
                                <div className="profile-text">
                                    <p>한찬희</p>
                                    <p>프로</p>
                                </div>
                            </div>
                            <div className="profile-user">
                                <div className="profile-img">
                                    <img src={userProfile}/>
                                </div>
                                <div className="profile-text">
                                    <p>한찬희</p>
                                    <p>프로</p>
                                </div>
                            </div>
                            <div className="profile-user">
                                <div className="profile-img">
                                    <img src={userProfile}/>
                                </div>
                                <div className="profile-text">
                                    <p>한찬희</p>
                                    <p>프로</p>
                                </div>
                            </div>
                        </div>
                        <p>팀 정보</p>
                        <div className="content-info">
                            <div className="info-div">
                                <div className="img-icon">
                                    <img src={location} />
                                    <p>지역</p>
                                </div>
                                전북 전주시
                            </div>
                            <div className="info-div">
                                <div className="img-icon">
                                    <img src={homeGround} />
                                    <p>홈 구장</p>
                                </div>
                                전주 두잇 풋살장
                            </div>
                            <div className="info-div">
                                <div className="img-icon">
                                    <img src={recruitTime} />
                                    <p>모임 시간</p>
                                </div>
                                매일 점심
                            </div>
                            <div className="info-div">
                                <div className="img-icon">
                                    <img src={avgTime} />
                                    <p>평균 나이</p>
                                </div>
                                20세
                            </div>
                            <div className="info-div">
                                <div className="img-icon">
                                    <img src={user} />
                                    <p>멤버</p>
                                </div>
                                3 명
                            </div>
                            <div className="info-div">
                                <div className="img-icon">
                                    <img src={looksOne} />
                                    <p>레벨</p>
                                </div>
                                비기너 1
                            </div>
                        </div>
                        <div className="chart-div">
                            chartView
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}