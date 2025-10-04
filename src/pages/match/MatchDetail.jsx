import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../layout/Layout';
import './MatchDetail.css'; // CSS 파일 import

// 아이콘 import (FaVectorSquare 추가)
import { FaHeart, FaShareSquare, FaUsers, FaTshirt, FaParking, FaRestroom, FaShower, FaStore, FaVectorSquare, FaClipboardList } from 'react-icons/fa';
import { IoMdFootball } from "react-icons/io";
import { GiWhistle } from "react-icons/gi";

function MatchDetailPage() {
    const { matchNo } = useParams();
    const [matchDetails, setMatchDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatchDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/Match/${matchNo}`);
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
                        <button className="apply-button">신청하기</button>
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
                            <div className="facility-item">
                                <FaVectorSquare />
                                <span className="facility-label">구장규격</span>
                                <span className="facility-description">{matchDetails.spcffct || '40 x 19'}</span>
                            </div>
                            <div className={matchDetails.hasTshirtRental === 'Y' ? 'facility-item' : 'facility-item disabled'}>
                                <FaTshirt />
                                <span className="facility-label">조끼 대여</span>
                            </div>
                            
                            <div className={matchDetails.isFieldRentalAvailable === 'Y' ? 'facility-item' : 'facility-item disabled'}>
                                <IoMdFootball />
                                <span className="facility-label">풋살장 대여</span>
                            </div>
                            
                            <div className={matchDetails.isOutdoor === 'Y' ? 'facility-item' : 'facility-item disabled'}>
                                <FaClipboardList />
                                <span className="facility-label">실외 구장</span>
                            </div>
                            
                            <div className={matchDetails.hasParking === 'Y' ? 'facility-item' : 'facility-item disabled'}>
                                <FaParking />
                                <span className="facility-label">주차장</span>
                                {/* 주차장이 있을 때만 주차 정보를 보여줍니다. */}
                                {matchDetails.hasParking === 'Y' && 
                                    <span className="facility-description">{matchDetails.parkingInfo || '정보 없음'}</span>
                                }
                            </div>
                            
                            <div className={matchDetails.hasRestroom === 'Y' ? 'facility-item' : 'facility-item disabled'}>
                                <FaRestroom />
                                <span className="facility-label">화장실</span>
                            </div>
                            
                            <div className={matchDetails.hasShower === 'Y' ? 'facility-item' : 'facility-item disabled'}>
                                <FaShower />
                                <span className="facility-label">샤워 시설</span>
                            </div>

                            <div className={matchDetails.hasStore === 'Y' ? 'facility-item' : 'facility-item disabled'}>
                                <FaStore />
                                <span className="facility-label">매점</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default MatchDetailPage;