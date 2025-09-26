import React, { useState, useEffect } from 'react';
import './selectfield.css';
import Headers from '../../components/Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'; 
import { addTimeSelection, removeTimeSelection } from '../../store/matchSlice';


const selectField = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { selections } = useSelector(state => state.matchCreation.step1_selection);

    const [province, setProvince] = useState([]);
    const [fieldData, setFieldData] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const [stadiumFields, setStadiumFields] = useState([]);
    const [selectedDate, setSelectedDate] = useState(() => {
        // selections 배열에 항목이 있으면, 그 첫 번째 항목의 날짜를 사용합니다.
        if (selections && selections.length > 0) {
            return selections[0].date;
        }
        // 없다면 오늘 날짜를 기본값으로 사용합니다.
        return moment().format('YYYY-MM-DD');
    });
    const [bookedTimeSlots, setBookedTimeSlots] = useState({}); // 예약 정보를 구장 ID별로 저장하는 객체
    const [selectProvince, setSelectProvince] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    
    console.log("Current selections from Redux:", selections);

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
        if (stadiumFields.length > 0 && selectedDate) {
            const fetchBookedTimes = async () => {
                try {
                        const bookedData = {};
                    // Promise.all을 사용하여 여러 필드의 예약 정보를 병렬로 가져와 성능을 개선합니다.
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
            setBookedTimeSlots({}); // stadiumFields가 없으면 예약 정보도 초기화합니다.
        }
    }, [stadiumFields, selectedDate]); 

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

       const isSelected = selections.some(
            sel => sel.fieldId === fieldId && sel.time === slotTime && sel.date === selectedDate
        );

        if (isSelected) {
            // 4. 이미 선택된 상태이면 배열에서 제거하는 removeSelection 액션을 사용합니다.
            dispatch(removeTimeSelection({
                fieldId: fieldId,
                time: slotTime,
                date: selectedDate
            }));
        } else {
            // 5. 선택되지 않은 상태이면 배열에 추가하는 addSelection 액션을 사용합니다.
            dispatch(addTimeSelection({
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
        if (selections.length > 0) {
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
                                <div key={field.fieldNo} className="field-item">
                                    <div className="field-info">
                                        <div className="field-text">
                                            <div className="field-name">{field.fieldName}</div>
                                            <div className="field-details">{field.sft}m</div>
                                        </div>
                                        <div className="time-slots">
                                            {generateTimeSlots(field.ost, field.oet).map((slot) => {
                                                const isSelected = selections.some(sel => {
                                                    // 각 조건을 개별 변수에 담아 결과를 명확히 확인합니다.
                                                    const idMatch = sel.fieldId == field.fieldNo;
                                                    const timeMatch = sel.time === slot;
                                                    const dateMatch = sel.date === selectedDate;

                                                    // --- 🧐 최종 디버깅 로그 ---
                                                    // 콘솔이 너무 복잡해지지 않도록, 현재 렌더링하는 슬롯이 Redux에 저장된 시간과 일치할 때만 로그를 출력합니다.
                                                    if (sel.time === slot) {
                                                        console.group(`--- [${slot}] 비교 결과 ---`);
                                                        console.log(`ID 일치?: ${idMatch}  (Redux값: '${sel.fieldId}', 컴포넌트값: '${field.fieldNo}')`);
                                                        console.log(`시간 일치?: ${timeMatch} (Redux값: '${sel.time}', 컴포넌트값: '${slot}')`);
                                                        console.log(`날짜 일치?: ${dateMatch} (Redux값: '${sel.date}', 컴포넌트값: '${selectedDate}')`);
                                                        console.groupEnd();
                                                    }
                                                    
                                                    return idMatch && timeMatch && dateMatch;
                                                });

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