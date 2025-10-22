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
    const [isLiked, setIsLiked] = useState(false); 
    const [isLiking, setIsLiking] = useState(false);

    useEffect(() => {
        const fetchMatchDetails = async () => {
            try {
                let url = `http://localhost/api/Match/${matchNo}`;
                if (user && user.email) {
                    url += `?email=${user.email}`;
                }
                const response = await axios.get(url);
                setMatchDetails(response.data);
                setIsLiked(response.data.isLikedByUser || false);
            } catch (err) {
                console.error("매치 상세 정보를 불러오는 데 실패했습니다:", err);
                setError("매치 정보를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);  
            }
        };
        
        if (matchNo) {
            fetchMatchDetails();
        }
    }, [matchNo, user]);
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

    const handleLikeToggle = async () => {
        if (!user) {
            if (window.confirm('로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?')) {
                navigate('/login', { state: { from: location.pathname } });
            }
            return;
        }

        if (isLiking) return;
        setIsLiking(true);

        const originalIsLiked = isLiked;
        setIsLiked(prev => !prev); 

        try {

            if (originalIsLiked) {
                
                await axios.delete(`http://localhost/api/Match/like/${matchNo}/${user.email}`);
            } else {
           
                await axios.post(`http://localhost/api/Match/like/${matchNo}/${user.email}`);
            }

        } catch (err) {
            console.error('좋아요 처리에 실패했습니다:', err);
            alert('좋아요 처리에 실패했습니다. 다시 시도해주세요.');
            setIsLiked(originalIsLiked); 
        } finally {
            // 7. 로딩 상태 해제
            setIsLiking(false);
        }
    };

     const applyMatch = async () => {
        if (matchDetails && matchDetails.totalPlayers === matchDetails.applyCount) {
            alert("이미 모집이 완료된 매치입니다.");
            return;
        }
        if (user) {
            if (window.confirm('매치를 신청하시겠습니까?')) {
                setIsApplying(true); 
                setApplyError(null); 

                try {
                    const url = `http://localhost/api/Match/apply/${matchNo}/${user.email}`;
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

    const isMatchFull = matchDetails && matchDetails.totalPlayers === matchDetails.applyCount;
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
                            <FaHeart 
                                size={24}
                                color={isLiked ? '#ff0000' : '#ccc'} 
                                onClick={handleLikeToggle}
                                style={{ 
                                    cursor: isLiking ? 'wait' : 'pointer',
                                    marginLeft: '10px' 
                                }}
                            />
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
                        <p>
                            모집인원: {matchDetails.totalPlayers}명 (현재 {matchDetails.applyCount}명 신청)
                        </p>
                        <button 
                            className="apply-button" 
                            onClick={applyMatch} 
                            disabled={isApplying || isMatchFull}
                        >
                            {isMatchFull ? '모집 완료' : (isApplying ? '신청 처리 중...' : '신청하기')}
                        </button>

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