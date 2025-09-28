import React, { useState, useEffect } from 'react';
import './selectfield.css';
import Headers from '../../components/Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
// useSelector, addTimeSelection, removeTimeSelection은 더 이상 사용하지 않습니다.
import { saveStep1 } from '../../store/matchSlice';


const SelectField = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // --- 로직 수정 1: State 관리 방식 변경 ---
    // Redux의 selections 배열 대신, 시작 시간과 이용 시간을 컴포넌트 내부에서 관리합니다.
    const [startTime, setStartTime] = useState(null); // 사용자가 선택한 시작 시간 { fieldId, time }
    const [duration, setDuration] = useState(2);      // 사용자가 선택한 이용 시간 (기본 2시간)

    // 기존 State들은 그대로 유지합니다.
    const [province, setProvince] = useState([]);
    const [fieldData, setFieldData] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const [stadiumFields, setStadiumFields] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [bookedTimeSlots, setBookedTimeSlots] = useState({});
    const [selectProvince, setSelectProvince] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // 기존 useEffect 로직들은 그대로 유지합니다.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/Match');
                setProvince(response.data.pro);
                setFieldData(response.data.Sta);
            } catch (error) {
                console.error("초기 데이터 호출 중 오류 발생:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (stadiumFields.length > 0 && selectedDate) {
            const fetchBookedTimes = async () => {
                try {
                        const bookedData = {};
                    await Promise.all(stadiumFields.map(async (field) => {
                        const response = await axios.get(`http://localhost:8080/api/Match/booked-slots`, {
                            params: {
                                fieldNo: field.fieldNo,
                                date: selectedDate
                            }
                        });
                        bookedData[field.fieldNo] = response.data;
                    }));
                    setBookedTimeSlots(bookedData);
                } catch (error) {
                    console.error("예약 시간 슬롯 호출 중 오류 발생:", error);
                    setBookedTimeSlots({});
                }
            };
            fetchBookedTimes();
        } else {
            setBookedTimeSlots({});
        }
    }, [stadiumFields, selectedDate]);

    // 기존 Helper 함수들은 그대로 유지합니다.
    const generateTimeSlots = (start, end) => {
        const slots = [];
        const startTime = moment(start, 'HH:mm');
        const endTime = moment(end, 'HH:mm');
        while (startTime.isBefore(endTime)) {
            slots.push(startTime.format('HH:mm'));
            startTime.add(1, 'hour');
        }
        return slots;
    };

    const isSlotBooked = (fieldNo, slotTime) => {
        const fieldBookedSlots = bookedTimeSlots[fieldNo] || [];
        return fieldBookedSlots.some(bookedSlot => {
            let bookedStart = moment(`${selectedDate} ${bookedSlot.matchTime}`);
            let bookedEnd = moment(`${selectedDate} ${bookedSlot.matchEndTime}`);
            if (bookedEnd.isBefore(bookedStart)) {
                bookedEnd.add(1, 'day');
            }
            const slotMoment = moment(`${selectedDate} ${slotTime}`);
            return slotMoment.isBetween(bookedStart, bookedEnd, null, '[)');
        });
    };

    // --- 로직 수정 2: 시간 선택 핸들러 변경 ---
    const handleTimeSlotClick = (fieldNo, slotTime) => {
        if (isSlotBooked(fieldNo, slotTime)) {
            alert('이미 예약된 시간입니다.');
            return;
        }

        // 선택한 시간부터 '이용 시간'만큼 예약이 가능한지 확인합니다.
        let isBlockAvailable = true;
        for (let i = 0; i < duration; i++) {
            const timeToCheck = moment(slotTime, 'HH:mm').add(i, 'hours').format('HH:mm');
            const field = stadiumFields.find(f => f.fieldNo === fieldNo);

            if (field && moment(timeToCheck, 'HH:mm').isSameOrAfter(moment(field.oet, 'HH:mm'))) {
                 isBlockAvailable = false;
                 break;
            }
            if (isSlotBooked(fieldNo, timeToCheck)) {
                isBlockAvailable = false;
                break;
            }
        }

        if (!isBlockAvailable) {
            alert(`${duration}시간을 연속으로 예약할 수 없습니다. 다른 시간을 선택해주세요.`);
            return;
        }

        // 가능하면 시작 시간으로 설정하고, 이미 선택된 경우 해제합니다.
        if (startTime && startTime.fieldNo === fieldNo && startTime.time === slotTime) {
            setStartTime(null);
        } else {
            setStartTime({ fieldNo, time: slotTime });
        }
    };

    // --- 로직 수정 3: '다음으로' 버튼 핸들러 변경 ---
    const handleNextClick = () => {
        if (!startTime) {
            alert('시작 시간을 선택해주세요.');
            return;
        }

        const matchEndTimeValue = moment(startTime.time, 'HH:mm').add(duration, 'hour').format('HH:mm');
        
        const matchDataToSend = {
            fieldNo: startTime.fieldNo,
            matchDate: selectedDate,         
            matchTime: startTime.time,        
            matchEndTime: matchEndTimeValue   
        };

        console.log('백엔드로 전송할 최종 매치 정보:', matchDataToSend);
        dispatch(saveStep1(matchDataToSend));
        navigate('/selectmatch');
    };

    // --- 로직 수정 4: 구장 변경 시 선택 초기화 ---
    const handleLocationClick = async (stadium) => {
        setStartTime(null); // 구장이 바뀌면 시작 시간을 초기화합니다.
        setSelectedField(stadium);
        try {
            const response = await axios.get(`http://localhost:8080/api/${stadium.staNo}/fields`);
            setStadiumFields(response.data);
        } catch (error) {
            console.error("구장 정보 API 호출 중 오류 발생:", error);
            setStadiumFields([]);
        }
    };

    // 기존 핸들러 함수들은 그대로 유지합니다.
    const handleProvinceChange = async (e) => {
        const selectedKeyword = e.target.value;
        setSelectProvince(selectedKeyword);
        try {
            const response = await axios.post('http://localhost:8080/api/select', { keyword: selectedKeyword });
            setFieldData(response.data);
            setSelectedField(null);
            setStadiumFields([]);
            setBookedTimeSlots({});
        } catch (error) {
            console.error("풋살장 목록 API 호출 중 오류 발생:", error);
            setFieldData([]);
        }
    };
    const handleDateChange = (e) => setSelectedDate(e.target.value);
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const filteredFieldData = fieldData.filter(loc => loc.staName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <Headers />
            <main className="container">
                <div className="register-container">
                    {/* 상단 UI (지역, 날짜, 검색)는 기존과 동일합니다. */}
                    <div className="step-indicators">
                        <div className="step-item active"><span>1. 구장 및 시간</span></div>
                        <div className="step-item"><span>2. 인원 및 레벨</span></div>
                        <div className="step-item"><span>3. 매치 글 작성</span></div>
                    </div>
                    <div className="selection-section">
                        <div className="selection-box"><select id="location-select" value={selectProvince} onChange={handleProvinceChange}><option value="">전체</option>{province.map((pro) => (<option key={pro.id} value={pro.name}>{pro.name}</option>))}</select></div>
                        <div className="selection-box"><input type="date" value={selectedDate} onChange={handleDateChange} /></div>
                        <div className="selection-box search-input-box"><input type="text" placeholder="검색할 구장명 입력" value={searchTerm} onChange={handleSearchChange}/></div>
                    </div>
                    <div className="location-list-container">
                        {filteredFieldData.length > 0 ? (<div className="location-list">{filteredFieldData.map((loc) => (<div key={loc.staNo} className={`location-item ${selectedField && selectedField.staNo === loc.staNo ? 'selected' : ''}`} onClick={() => handleLocationClick(loc)}><div className="location-name">{loc.staName}</div><div className="location-address">{loc.staAddr}</div></div>))}</div>) : (<div className="no-data-message"><span>풋살장이 존재하지 않습니다.</span></div>)}
                    </div>
                    <hr />
                    <div className="field-list">
                        {stadiumFields.map((field) => (
                            <div key={field.fieldNo} className="field-item">
                                <div className="field-info">
                                    <div className="field-text">
                                        <div className="field-name">{field.fieldName}</div>
                                        <div className="field-details">{field.sft}m</div>
                                    </div>

                                    {/* --- UI 변경 1: 이용 시간 선택 UI 추가 --- */}
                                    <div className="duration-selector">
                                        <strong>이용 시간: </strong>
                                        {[1, 2, 3].map(hour => (
                                            <button
                                                key={hour}
                                                onClick={() => {
                                                    setDuration(hour);
                                                    setStartTime(null); // 이용 시간 변경 시 시작 시간 초기화
                                                }}
                                                className={duration === hour ? 'active' : ''}
                                            >
                                                {hour}시간
                                            </button>
                                        ))}
                                    </div>

                                    <div className="time-slots">
                                        {generateTimeSlots(field.ost, field.oet).map((slot) => {
                                            // --- UI 변경 2: '선택됨' 상태 판단 로직 수정 ---
                                            let isSelected = false;
                                            if (startTime && startTime.fieldNo === field.fieldNo) {
                                                const startMoment = moment(startTime.time, 'HH:mm');
                                                const endMoment = moment(startTime.time, 'HH:mm').add(duration, 'hours');
                                                const currentMoment = moment(slot, 'HH:mm');
                                                // 현재 슬롯이 [시작시간, 종료시간) 범위에 있는지 확인
                                                if (currentMoment.isBetween(startMoment, endMoment, null, '[)')) {
                                                    isSelected = true;
                                                }
                                            }

                                            return (
                                                <span
                                                    key={`${field.fieldNo}-${slot}`}
                                                    className={`time-slot ${isSlotBooked(field.fieldNo, slot) ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                                                    onClick={() => handleTimeSlotClick(field.fieldNo, slot)}
                                                >
                                                    {slot}
                                                </span>
                                            );
                                        })}
                                    </div>
                                    {startTime && startTime.fieldNo === field.fieldNo && (
                                        <div className="selected-time-display">
                                            ✅ 예약 시간: <strong>{startTime.time}</strong> ~ <strong>{moment(startTime.time, 'HH:mm').add(duration, 'hour').format('HH:mm')}</strong> ({duration}시간)
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="next-button" onClick={handleNextClick}>다음으로</button>
                </div>
            </main>
        </>
    );
};

export default SelectField;