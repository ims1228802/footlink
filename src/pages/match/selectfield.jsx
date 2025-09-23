import React, { useState, useEffect } from 'react';
import './selectfield.css';
import Headers from '../../components/Header/Header';
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'; 
import { selectSlot, clearSelection } from '../../store/matchSlice'; 

const selectField = () => {
    // ... (기존 상태 변수들은 동일)
    const navigate = useNavigate();
    const [province, setProvince] = useState([]);
    const [fieldData, setFieldData] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const [stadiumFields, setStadiumFields] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD')); // 초기 날짜를 오늘로 설정
    const [bookedTimeSlots, setBookedTimeSlots] = useState({}); // 예약 정보를 구장 ID별로 저장하는 객체
    const [selectProvince, setSelectProvince] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const dispatch = useDispatch(); 
    const { selectedFieldId, selectedTime } = useSelector(state => state.matchSelection); // Store에서 현재 상태 가져오기
    

    // 컴포넌트 초기 렌더링 시 지역 데이터 및 초기 풋살장 데이터 가져오기
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

    // 선택된 구장, 날짜가 변경될 때마다 예약된 시간 슬롯을 가져오는 훅
    useEffect(() => {
        if (selectedField && selectedDate) {
            const fetchBookedTimes = async () => {
                try {

                    const fieldIds = stadiumFields.map(field => field.fieldNo);

                    // 각 필드별로 예약 시간을 조회
                    const bookedData = {};
                    for (const fieldId of fieldIds) {
                        const response = await axios.get(`http://localhost:8080/api/Match/booked-slots`, {
                            params: {
                                fieldNo: fieldId,
                                date: selectedDate
                            }
                        });
                        bookedData[fieldId] = response.data;
                    }
                    setBookedTimeSlots(bookedData);
                } catch (error) {
                    console.error("예약 시간 슬롯 호출 중 오류 발생:", error);
                    setBookedTimeSlots({});
                }
            };
            fetchBookedTimes();
        }
    }, [selectedField, selectedDate, stadiumFields]); 

    // 구장 운영 시간을 기반으로 시간 슬롯을 생성하는 함수
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
        // 날짜와 시간을 합쳐 완벽한 Date-time 객체 생성
        let bookedStart = moment(`${selectedDate} ${bookedSlot.matchTime}`);
        let bookedEnd = moment(`${selectedDate} ${bookedSlot.matchEndTime}`);

        // 밤 12시를 넘어가는 매치를 처리하는 로직
        if (bookedEnd.isBefore(bookedStart)) {
            bookedEnd.add(1, 'day');
        }
        
        // 현재 시간 슬롯에도 날짜 정보 추가
        const slotMoment = moment(`${selectedDate} ${slotTime}`);
        
        // 완전한 Date-time 객체를 사용해 isBetween으로 정확한 비교 수행
        return slotMoment.isBetween(bookedStart, bookedEnd, null, '[)');
    });
};

    // 지역 드롭다운 변경 시 풋살장 목록을 가져오는 함수
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

    // 풋살장 클릭 시 구장 정보를 가져오는 함수
    const handleLocationClick = async (stadium) => {
        setSelectedField(stadium);
        try {
            const response = await axios.get(`http://localhost:8080/api/${stadium.staNo}/fields`);
            setStadiumFields(response.data);
        } catch (error) {
            console.error("구장 정보 API 호출 중 오류 발생:", error);
            setStadiumFields([]);
        }
    };

    // 날짜 입력 핸들러
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };
    
    // 시간 슬롯 클릭 핸들러 (구장 ID와 시간 값을 받아 상태 업데이트)
    const handleTimeSlotClick = (fieldId, slotTime) => {
        if (isSlotBooked(fieldId, slotTime)) {
            return; // 예약된 슬롯은 선택 불가
        }

        if (selectedFieldId === fieldId && selectedTime === slotTime) {
            dispatch(clearSelection());
        } else {
            dispatch(selectSlot({ 
                fieldId: fieldId, 
                time: slotTime,
                date: selectedDate 
            }));
        }
    };

   // 검색어 입력 시 상태를 업데이트하는 핸들러 추가
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // 렌더링 직전에 검색어로 fieldData를 필터링
    const filteredFieldData = fieldData.filter(loc =>
        loc.staName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNextClick = () => {
        // 유효성 검사: 필드 ID와 시간이 모두 선택되었는지 확인
        if (selectedFieldId && selectedTime) {
            navigate('/selectmatch'); 
        } else {
            alert('구장과 시간을 모두 선택해주세요.');
        }
    };

    return (
        <>
            <Headers />
            <main className="container">
                <div className="register-container">
                  <div className="step-indicators">
                        <div className="step-item active">
                            <span>1. 구장 및 시간</span>
                        </div>
                        <div className="step-item">
                            <span>2. 인원 및 레벨</span>
                        </div>
                        <div className="step-item">
                            <span>3. 매치 글 작성</span>
                        </div>
                    </div>
                    <div className="selection-section">
                        <div className="selection-box">
                            <select id="location-select" value={selectProvince} onChange={handleProvinceChange}>
                                <option value="">전체</option>
                                {province.map((pro) => (
                                    <option key={pro.id} value={pro.name}>{pro.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="selection-box">
                            <input type="date" value={selectedDate} onChange={handleDateChange} />
                        </div>
                        <div className="selection-box search-input-box">
                            <input
                                type="text"
                                placeholder="검색할 구장명 입력"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>

                    <div className="location-list-container">
                        {filteredFieldData.length > 0 ? (
                            <div className="location-list">
                                {filteredFieldData.map((loc) => (
                                    <div
                                        key={loc.staNo}
                                        className={`location-item ${selectedField && selectedField.staNo === loc.staNo ? 'selected' : ''}`}
                                        onClick={() => handleLocationClick(loc)}
                                    >
                                        <div className="location-name">{loc.staName}</div>
                                        <div className="location-address">{loc.staAddr}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-data-message">
                                <span>풋살장이 존재하지 않습니다.</span>
                            </div>
                        )}
                    </div>
                    
                    <hr />

                    <div className="field-list">
                        {stadiumFields.length > 0 ? (
                            stadiumFields.map((field) => (
                                <div key={field.id} className="field-item">
                                    <div className="field-info">
                                        <div className="field-text">
                                            <div className="field-name">{field.fieldName}</div>
                                            <div className="field-details">{field.sft}m</div>
                                        </div>
                                        <div className="time-slots">
                                            {generateTimeSlots(field.ost, field.oet).map((slot, index) => {
                                                const isSelected = selectedFieldId === field.fieldNo && selectedTime === slot;
                                                
                                                return (
                                                    <span
                                                        key={index}
                                                        className={`time-slot ${isSlotBooked(field.fieldNo, slot) ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                                                        onClick={() => handleTimeSlotClick(field.fieldNo, slot)}
                                                    >
                                                        {slot}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            selectedField && (
                                <div className="no-data-message">
                                    <span>선택한 풋살장에 대한 구장 정보가 없습니다.</span>
                                </div>
                            )
                        )}
                    </div>
                    
                    <button className="next-button" onClick={handleNextClick}>
                        다음으로
                    </button>
                </div>
            </main>
        </>
    );
};

export default selectField;