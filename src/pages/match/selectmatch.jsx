import React, { useState, useEffect } from 'react';
import './selectmatch.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveStep2 } from '../../store/matchSlice';
import Layout from '../../layout/Layout';

const AddMatchLevel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const savedStep2Data = useSelector(state => state.matchCreation.step2_details);

    const [matchType, setMatchFormat] = useState(savedStep2Data.matchType);
    const [gender, setGender] = useState(savedStep2Data.gender);
    const [minLevel, setMinLevel] = useState(savedStep2Data.minLevel);
    const [maxLevel, setMaxLevel] = useState(savedStep2Data.maxLevel);

    // 레벨 슬라이더 UI를 위한 내부 상태 (이전과 동일)
    const [startSlot, setStartSlot] = useState(null);
    const [endSlot, setEndSlot] = useState(null);

    const levelData = [
        { name: '비기너', min: 1, max: 3, slots: 3, className: 'beginner' },
        { name: '아마추어', min: 4, max: 8, slots: 5, className: 'amateur' },
        { name: '세미프로', min: 9, max: 11, slots: 3, className: 'semipro' },
        { name: '프로', min: 12, max: 12, slots: 1, className: 'pro' },
    ];


   useEffect(() => {
        if (minLevel !== null && maxLevel !== null) {
            let currentGlobalIndex = 0;
            let foundStartSlot = null;
            let foundEndSlot = null;

            for (let levelIndex = 0; levelIndex < levelData.length; levelIndex++) {
                const level = levelData[levelIndex];
                if (minLevel >= level.min && minLevel <= level.max) {
                    for (let slotIndex = 0; slotIndex < level.slots; slotIndex++) {
                        const actualLevel = currentGlobalIndex + slotIndex + 1; 
                        if (actualLevel === minLevel) {
                            foundStartSlot = currentGlobalIndex + slotIndex;
                            break;
                        }
                    }
                }
                if (foundStartSlot !== null) break;
                currentGlobalIndex += level.slots;
            }

            currentGlobalIndex = 0; // 초기화
            for (let levelIndex = 0; levelIndex < levelData.length; levelIndex++) {
                const level = levelData[levelIndex];
                if (maxLevel >= level.min && maxLevel <= level.max) {
                    for (let slotIndex = 0; slotIndex < level.slots; slotIndex++) {
                         const actualLevel = currentGlobalIndex + slotIndex + 1;
                        if (actualLevel === maxLevel) {
                            foundEndSlot = currentGlobalIndex + slotIndex;
                            break;
                        }
                    }
                }
                if (foundEndSlot !== null) break;
                currentGlobalIndex += level.slots;
            }

            if (foundStartSlot !== null && foundEndSlot !== null) {
                setStartSlot(foundStartSlot);
                setEndSlot(foundEndSlot);
            }
        }
    }, [minLevel, maxLevel]);


    const handleSlotClick = (levelIndex, slotIndex) => {
        const globalIndex = levelData.slice(0, levelIndex).reduce((acc, level) => acc + level.slots, 0) + slotIndex;

        if (startSlot === null) {
            setStartSlot(globalIndex);
            setEndSlot(null);
        } else if (endSlot === null) {
            const minSelectedSlot = Math.min(startSlot, globalIndex);
            const maxSelectedSlot = Math.max(startSlot, globalIndex);
            setStartSlot(minSelectedSlot);
            setEndSlot(maxSelectedSlot);

            setMinLevel(minSelectedSlot + 1);
            setMaxLevel(maxSelectedSlot + 1);

        } else {
            setStartSlot(globalIndex);
            setEndSlot(null);
            // 내부 상태 초기화
            setMinLevel(null);
            setMaxLevel(null);
        }
    };

    const isSlotSelected = (globalIndex) => {
        if (startSlot === null) return false;
        const minIndex = Math.min(startSlot, endSlot !== null ? endSlot : startSlot);
        const maxIndex = Math.max(startSlot, endSlot !== null ? endSlot : startSlot);
        return globalIndex >= minIndex && globalIndex <= maxIndex;
    };

    const handleNextClick = () => {
        if (minLevel !== null && maxLevel !== null) {
            const step2Data = {
                matchType,
                gender,
                minLevel,
                maxLevel,
            };
            dispatch(saveStep2(step2Data));
            navigate('/selectdetail'); 
        } else {
            alert('인원 및 레벨을 선택해주세요.');
        }
    };

    return (
        <>
            <Layout>
            <main className="container">
                <div className="register-container">
 
                    <h1 className="step-title">2. 인원 및 레벨을 선택해주세요</h1>

                     {/* 레벨 선택 섹션 */}
                    <div className="level-selection-container">
                        {levelData.map((level, levelIndex) => (
                            <div 
                                key={levelIndex} 
                                className={`level-group ${level.className}`} 
                                style={{ flexGrow: level.slots }}
                            >
                                <div className="level-buttons-row">
                                    {Array.from({ length: level.slots }).map((_, slotIndex) => {
                                        const globalIndex = levelData.slice(0, levelIndex).reduce((acc, l) => acc + l.slots, 0) + slotIndex;
                                        return (
                                            <button
                                                key={slotIndex}
                                                className={`level-button ${isSlotSelected(globalIndex) ? 'selected' : ''}`}
                                                onClick={() => handleSlotClick(levelIndex, slotIndex)}
                                            ></button>
                                        );
                                    })}
                                </div>
                                <div className="level-bar-and-label"> 
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
                                value={matchType}
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

                    <button className="next-button" onClick={handleNextClick}>
                        다음으로
                    </button>
                </div>
            </main>
            </Layout>
        </>
    );
};

export default AddMatchLevel;