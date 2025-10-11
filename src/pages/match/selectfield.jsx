import React, { useState, useEffect } from 'react';
import './selectfield.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { saveStep1 } from '../../store/matchSlice';
import Layout from '../../layout/Layout';


const SelectField = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [startTime, setStartTime] = useState(null);
    const [duration, setDuration] = useState(2);     

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
                const response = await axios.get('http://localhost/api/Match');
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
                        const response = await axios.get(`http://localhost/api/Match/booked-slots`, {
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


    const handleTimeSlotClick = (fieldNo, slotTime) => {
        if (isSlotBooked(fieldNo, slotTime)) {
            alert('이미 예약된 시간입니다.');
            return;
        }


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


        if (startTime && startTime.fieldNo === fieldNo && startTime.time === slotTime) {
            setStartTime(null);
        } else {
            setStartTime({ fieldNo, time: slotTime });
        }
    };


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
 
    const handleLocationClick = async (stadium) => {
        setStartTime(null); 
        setSelectedField(stadium);
        try {
            const response = await axios.get(`http://localhost/api/Match/${stadium.staNo}/fields`);
            setStadiumFields(response.data);
        } catch (error) {
            console.error("구장 정보 API 호출 중 오류 발생:", error);
            setStadiumFields([]);
        }
    };

    const handleProvinceChange = async (e) => {
        const selectedKeyword = e.target.value;
        setSelectProvince(selectedKeyword);
        try {
            const response = await axios.post('http://localhost/api/Match/select', { keyword: selectedKeyword });
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
            <Layout>
            <main className="container">
                <div className="register-container">

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
                        {filteredFieldData.length > 0 ? (<div className="location-list">{filteredFieldData.map((loc) => (<div key={loc.staNo} 
                        className={`location-item ${selectedField && selectedField.staNo === loc.staNo ? 'selected' : ''}`} 
                        onClick={() => handleLocationClick(loc)}><div className="location-name">{loc.staName}
                    </div>
                    <div className="location-address">{loc.staAddr}</div></div>))}</div>) : (<div className="no-data-message">
                        <span>풋살장이 존재하지 않습니다.</span></div>)}
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

                                    <div className="duration-selector">
                                        <strong>이용 시간: </strong>
                                        {[1, 2, 3].map(hour => (
                                            <button
                                                key={hour}
                                                onClick={() => {
                                                    setDuration(hour);
                                                    setStartTime(null); 
                                                }}
                                                className={duration === hour ? 'active' : ''}
                                            >
                                                {hour}시간
                                            </button>
                                        ))}
                                    </div>

                                    <div className="time-slots">
                                        {generateTimeSlots(field.ost, field.oet).map((slot) => {
                                            let isSelected = false;
                                            if (startTime && startTime.fieldNo === field.fieldNo) {
                                                const startMoment = moment(startTime.time, 'HH:mm');
                                                const endMoment = moment(startTime.time, 'HH:mm').add(duration, 'hours');
                                                const currentMoment = moment(slot, 'HH:mm');
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
            </Layout>
        </>
    );
};

export default SelectField;