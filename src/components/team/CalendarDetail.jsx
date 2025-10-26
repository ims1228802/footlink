import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

export default function CalendarDetail({ onClose, teamDateCode }){
    const [ detail, setDetail ] = useState({});
    const calendarDate = new Date(detail.date);
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth() + 1;
    const day = calendarDate.getDate();

    const dateText = `${year}년 ${month}월 ${day}일`;
    const regex = /^(\d{2}:\d{2}):\d{2}$/;
    const startTime = detail.startTime;
    const endTime = detail.endTime;

    useEffect(() => {
        axios.get('http://localhost/api/team/calendar/detail', {
            params: {
                teamDateCode: teamDateCode
            }
        })
        .then(response => {
            console.log(response.data);
            setDetail(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, []);

    return (
        <div className="calendar-detail">
            <h2>{detail.title}</h2>
                <div className="calendar-date-div">
                    <p>진행 날짜: {dateText}</p>
                    <span>진행 시간: {startTime} - {endTime}</span>
                </div>
                <p>장소: {detail.placeName}</p>
            <div className="calendar-contents-div">
                <p>{detail.contents}</p>
            </div>
            <div className="button-div">
                <button type="button" className="close-btn" onClick={() => onClose()}>닫기</button>
            </div>
        </div>
    )
}