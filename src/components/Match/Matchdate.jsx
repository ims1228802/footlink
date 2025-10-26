import { useState } from 'react';
import './Matchdate.css';


function DateNavigator({ selectedDate, onDateChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const NextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const PreviousMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };


  const getDayName = (date) => {
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    return dayNames[date.getDay()];
  };

  const NextDate = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const PreviousDate = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const getFiveDays = (date) => {
    const daysArray = [];
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - 2);

    for (let i = 0; i < 5; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      daysArray.push(day);
    }
    return daysArray;
  };

  const filteredDays = getFiveDays(currentDate);

  return (
    <div className="calendar-section">
      <div className="calendar-header">
        <button className="arrow-left" onClick={PreviousMonth}>〈</button>
        <h2>{`${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}`}</h2>
        <button className="arrow-right" onClick={NextMonth}>〉</button>
      </div>
      <div className="date-list">
        <button className='arrow-left' onClick={PreviousDate}>〈</button>
        {filteredDays.map((day, index) => (
          <div key={index} className="date-item">
            <button
              className={
                day.getFullYear() === selectedDate.getFullYear() &&
                day.getMonth() === selectedDate.getMonth() &&
                day.getDate() === selectedDate.getDate()
                  ? "active"
                  : ""
              }
              onClick={() => onDateChange(day)}
            >
              <span className="day">{getDayName(day)}</span>
              <span className="date">{day.getDate()}</span>
            </button>
          </div>
        ))}
        <button className="arrow-right" onClick={NextDate}>〉</button>
      </div>
      <hr className="divider" />
    </div>
  );
}

export default DateNavigator;