import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation  } from 'react-router-dom';
import { useDispatch } from 'react-redux'; //     
import axios from 'axios';
import Layout from '../../layout/Layout';
import './MatchDetail.css';
import { useUser } from "../../hooks/useUser";

// 아이콘 import 
import { FaHeart, FaShareSquare, FaUsers, FaTshirt, FaParking, FaRestroom, FaShower, FaStore, FaVectorSquare, FaShoePrints } from 'react-icons/fa';
import { IoMdFootball } from "react-icons/io";
import { GiWhistle } from "react-icons/gi";

function MatchDetailPage() {    
    const { matchNo } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [matchDetails, setMatchDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isApplying, setIsApplying] = useState(false);
    const [applyError, setApplyError] = useState(null);
    const location = useLocation();
    const { data: user, isLoading } = useUser();
    useEffect(() => {
        const fetchMatchDetails = async () => {
            try {
                const response = await axios.get(`http://localhost/api/Match/${matchNo}`);
                setMatchDetails(response.data);
            } catch (err) {
                console.error("매치 상세 정보를 불러오는 데 실패했습니다:", err);
                setError("매치 정보를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);  
            }
        };
        fetchMatchDetails();
    }, [matchNo]);
    useEffect(() => {
        const fetchUserInfo = async () => {
          const token = localStorage.getItem("accessToken");
          if (!token) return;
    
          dispatch(setLoading(true));
          try {
            const res = await axiosInstance.get("/user/my-info", {
              headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(setUser(res.data));
          } catch (err) {
            console.error("내 정보 불러오기 실패:", err);
          } finally {
            dispatch(setLoading(false));
          }
        };
    
        fetchUserInfo();
      }, [dispatch]);

    const formatTime = (timeStr) => {
        if (!timeStr) return "";
        return timeStr.slice(0, 5);
    };

    const formatDateTime = (dateStr, startTime, endTime) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = days[date.getDay()];
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${dayOfWeek}요일 ${formatTime(startTime)}~${formatTime(endTime)}`;
    };

     const applyMatch = async () => {
        if (user) {
            if (window.confirm('매치를 신청하시겠습니까?')) {
                setIsApplying(true); // 로딩 시작
                setApplyError(null); // 이전 에러 초기화

                try {
                    const url = `http://localhost/api/Match/apply/${matchNo}/${user.email}`;
                    // 컴포넌트에서 직접 API 호출
                    const response = await axios.post(url);
                    
                    console.log('매치 신청 성공:', response.data);
                    alert('매치 신청이 완료되었습니다.');

                } catch (err) {
                    console.error('매치 신청 실패:', err);
                    setApplyError('매치 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
                    alert('매치 신청에 실패했습니다.');

                } finally {
                    setIsApplying(false); 
                }
            }
        } else {
            if (window.confirm('로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?')) {
                navigate('/login', { state: { from: location.pathname } });

            }
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="message-container">데이터를 불러오는 중입니다...</div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="message-container">{error}</div>
            </Layout>
        );
    }

    if (!matchDetails) {
        return (
            <Layout>
                <div className="message-container">해당 매치 정보를 찾을 수 없습니다.</div>
            </Layout>
        );
    }

    return (
        <>
            <Layout>
                <div className="page-container">
                    <div className="image-banner" style={{ backgroundImage: `url(${matchDetails.fieldImageUrl || 'default_banner_image_url.jpg'})` }}>
                        <img className="sports-logo" src={matchDetails.logoUrl || '/path/to/default/logo.png'} alt="Sports Logo" />
                    </div>
                    <div className="match-info-container">
                        <div className="title-row">
                            <h1>{matchDetails.staName}{matchDetails.fieldName}</h1>
                            <FaHeart size={24} color="#ccc" />
                        </div>
                        <p className="location">
                            {matchDetails.staAddr}
                            <button className="share-button">
                                <FaShareSquare /> 매치 공유
                            </button>
                        </p>
                        <p className="date-time">
                            {formatDateTime(matchDetails.matchDate, matchDetails.matchTime, matchDetails.matchEndTime)}
                        </p>
                        <button className="apply-button" onClick={applyMatch} disabled={isApplying}>
                            {isApplying ? '신청 처리 중...' : '신청하기'}
                        </button>
                        {/* 신청 실패 시 에러 메시지 표시 */}
                        {applyError && <p className="error-message">{applyError}</p>}
                    </div>

                    <div className="section">
                        <h2 className="section-title">매치 방식</h2>
                        <div className="icon-grid">
                            <div className="icon-item">
                                <div className="icon-circle"><GiWhistle /></div>
                                <span className="icon-label">{matchDetails.matchTypeName}</span>
                            </div>
                            <div className="icon-item">
                                <div className="icon-circle"><IoMdFootball /></div>
                                <span className="icon-label">{matchDetails.minLevelName}~{matchDetails.maxLevelName} </span>
                            </div>
                            <div className="icon-item">
                                <div className="icon-circle"><FaUsers /></div>
                                <span className="icon-label">{matchDetails.genderName}</span>
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <div className="facility-grid">
                            {/* 구장 규격 */}
                            <div className="facility-item">
                                <FaVectorSquare />
                                <span className="facility-label">구장규격</span>
                                <span className="facility-description">{matchDetails.spcffct || '정보 없음'}</span>
                            </div>

                            {/* 조끼 대여 */}
                            <div className={matchDetails.vestRtYn === 'Y' ? 'facility-item' : 'facility-item disabled'}>
                                <FaTshirt />
                                <span className="facility-label">조끼 대여</span>
                            </div>

                            {/* 풋살화 대여 (새로 추가) */}
                            <div className={matchDetails.shoRtYn === 'Y' ? 'facility-item' : 'facility-item disabled'}>
                                <FaShoePrints /> 
                                <span className="facility-label">풋살화 대여</span>
                            </div>

                            {/* 풋살공 대여 (새로 추가) */}
                            <div className={matchDetails.ballRtYn === 'Y' ? 'facility-item' : 'facility-item disabled'}>
                                <IoMdFootball />
                                <span className="facility-label">풋살공 대여</span>
                            </div>

                            {/* 주차장 */}
                            <div className={matchDetails.parkingYn === 'Y' ? 'facility-item' : 'facility-item disabled'}>
                                <FaParking />
                                <span className="facility-label">주차장</span>
                                {/* 주차장이 있을 때만 주차 정보를 보여줍니다. */}
                                {matchDetails.parkingYn === 'Y' && 
                                    <span className="facility-description">{'주차 가능' || '주차 불가능'}</span>
                                }
                            </div>

                            {/* 화장실 */}
                            <div className={matchDetails.restYn === 'Y' ? 'facility-item' : 'facility-item disabled'}>
                                <FaRestroom />
                                <span className="facility-label">화장실</span>
                            </div>

                            {/* 샤워 시설 */}
                            <div className={matchDetails.showerYn === 'Y' ? 'facility-item' : 'facility-item disabled'}>
                                <FaShower />
                                <span className="facility-label">샤워 시설</span>
                            </div>

                            {/* 매점 (음료 판매) */}
                            <div className={matchDetails.sellDrink === 'Y' ? 'facility-item' : 'facility-item disabled'}>
                                <FaStore />
                                <span className="facility-label">매점/음료</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default MatchDetailPage;