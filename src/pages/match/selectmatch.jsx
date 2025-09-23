import React, { useState } from 'react';
import './selectmatch.css';
import Headers from '../../components/Header/Header';
import { Link } from 'react-router-dom';

const addMatchLevel = () => {
    // 레벨 데이터에 각 레벨이 차지할 칸 수를 추가합니다.
    const levelData = [
        { name: '비기너', min: 1, max: 3, color: '#88C059', slots: 3 },
        { name: '아마추어', min: 4, max: 8, color: '#68B3E4', slots: 5 },
        { name: '세미프로', min: 9, max: 11, color: '#E99092', slots: 3 },
        { name: '프로', min: 12, max: 12, color: '#B6B6B6', slots: 1 },
    ];

    const [startSlot, setStartSlot] = useState(null);
    const [endSlot, setEndSlot] = useState(null);
    const [matchFormat, setMatchFormat] = useState('6vs6');
    const [gender, setGender] = useState('혼성');

    const handleSlotClick = (levelIndex, slotIndex) => {
        const globalIndex = levelData.slice(0, levelIndex).reduce((acc, level) => acc + level.slots, 0) + slotIndex;

        if (startSlot === null) {
            setStartSlot(globalIndex);
            setEndSlot(null);
        } else if (endSlot === null) {
            const minIndex = Math.min(startSlot, globalIndex);
            const maxIndex = Math.max(startSlot, globalIndex);
            setEndSlot(maxIndex);
            setStartSlot(minIndex);
        } else {
            setStartSlot(globalIndex);
            setEndSlot(null);
        }
    };

    const isSlotSelected = (globalIndex) => {
        if (startSlot === null) return false;
        
        const minIndex = Math.min(startSlot, endSlot || startSlot);
        const maxIndex = Math.max(startSlot, endSlot || startSlot);
        
        return globalIndex >= minIndex && globalIndex <= maxIndex;
    };
    
    return (
        <>
            <Headers />
            <main className="container">
                <div className="register-container">
                    <div className="step-indicators">
                      <div className="step-item">
                          <span>1. 구장 및 시간</span>
                      </div>
                      <div className="step-item active">
                          <span>2. 인원 및 레벨</span>
                      </div>
                      <div className="step-item">
                          <span>3. 매치 등록</span>
                      </div>
                    </div>

                    <h1 className="step-title">2. 인원 및 레벨을 선택해주세요</h1>

                    {/* 레벨 선택 섹션 */}
                    <div className="level-selection-container">
                        {levelData.map((level, levelIndex) => (
                            <div 
                                key={levelIndex} 
                                className="level-group"
                                style={{ flexGrow: level.slots }}
                            >
                                <div className="level-buttons-row">
                                    {Array.from({ length: level.slots }).map((_, slotIndex) => (
                                        <button
                                            key={slotIndex}
                                            className={`level-button ${isSlotSelected(levelData.slice(0, levelIndex).reduce((acc, l) => acc + l.slots, 0) + slotIndex) ? 'selected' : ''}`}
                                            onClick={() => handleSlotClick(levelIndex, slotIndex)}
                                            style={{ backgroundColor: isSlotSelected(levelData.slice(0, levelIndex).reduce((acc, l) => acc + l.slots, 0) + slotIndex) ? level.color : '#e0e0e0' }}
                                        ></button>
                                    ))}
                                </div>
                                <div className="level-bar-and-label" style={{ backgroundColor: level.color }}>
                                    <span>{level.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 매치 방식 및 성별 선택 섹션 */}
                    <div className="match-details">
                        <div className="detail-item">
                            <label htmlFor="match-format">매치 방식</label>
                            <select 
                                id="match-format" 
                                value={matchFormat} 
                                onChange={(e) => setMatchFormat(e.target.value)}
                            >
                                <option value="6vs6">6vs6</option>
                                <option value="5vs5">5vs5</option>
                                <option value="4vs4">4vs4</option>
                            </select>
                        </div>
                        <div className="detail-item">
                            <label htmlFor="gender">성별</label>
                            <select 
                                id="gender" 
                                value={gender} 
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="혼성">혼성</option>
                                <option value="남성">남성</option>
                                <option value="여성">여성</option>
                            </select>
                        </div>
                    </div>

                    <Link to="/selectdetail">
                        <button className="next-button">다음으로</button>
                    </Link>
                </div>
            </main>
        </>
    );
};

export default addMatchLevel;