import React from "react";
import { useState, useEffect } from "react";
import search from "../../assets/team/search.png";
import axios from "axios";

export default function Calendar({ onClose, teamCode }) {
    const [ title, setTitle ] = useState('');
    const [ startTime, setStartTime ] = useState('');
    const [ date, setDate ] = useState('');
    const [ endTime, setEndTime ] = useState('');
    const [ contents, setContents ] = useState('');
    const [ location, setLocation ] = useState('');

    const today = new Date();               // 현재 날짜
    const year = today.getFullYear()        // 년도
    const month = today.getMonth() + 1      // 월
    const dates = today.getDate()           // 일

    useEffect(() => {
        setDate(`${year}-${month}-${dates}`);
    },[]);


    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost/api/team/calendar', {
            params: {
                title: title,
                location: location,
                date: date,
                startTime: startTime,
                endTime : endTime,
                contents: contents,
                teamCode: teamCode
            }
        })
        .then(response => {
            console.log(response.data);
            alert('일정 생성이 성공적으로 완료됐어요!');
        })
        .catch(error => {
            console.error(`api 요청중 에러 발생: ${error}`);
        });

        onClose();
    }

    return(
        <>
            <h2>일정 추가</h2>
            <p>팀의 새로운 일정을 만들어 보세요.</p>
            <form onSubmit={onSubmitHandler}>
                <div className="new-calendar">
                    <h2>제목</h2>
                    <input type="text" className="input" placeholder="제목을 입력해주세요" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </div>
                <div className="new-calendar">
                    <h2>장소</h2>
                    <div className="input-box">
                        <input type="text" placeholder="장소 검색" value={location} onChange={(e) => setLocation(e.target.value)} required/>
                        <img src={search} />
                    </div>
                </div>
                <div className="new-calendar">
                    <h2>시간</h2>
                    <input type="date" id="date" name="date" value={date} onInput={(e) => setDate(e.target.value)}/>
                    <input type="time" id="startTime" name="startTime" data-placeholder="시작시간" value={startTime} onInput={(e) => setStartTime(e.target.value)} required/>
                    <input type="time" id="endTime" name="endTime" data-placeholder="종료시간" value={endTime} onInput={(e) => setEndTime(e.target.value)} required/>
                </div>
                <div className="new-calendar">
                    <h2>상세내용</h2>
                    <textarea value={contents} onChange={(e) => setContents(e.target.value)} />
                </div>
                <div className="button-div">
                    <button type="submit" className="submit-btn">추가하기</button>
                    <button type="button" className="close-btn" onClick={onClose}>닫기</button>
                </div>
            </form>
        </>
    );
}