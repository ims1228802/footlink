import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function StadiumSearch({ team, setTeam, onClose }){
    const [ area, setArea ] = useState([]);
    const [ stadium, setStadium ] = useState([]);
    const [ searchText, setSearchText ] = useState('');
    const [ selectText, setSelectText ] = useState('');
    const [ clickStadium, setClickStadium ] = useState('');

    useEffect(() => {
        axios.get('http://localhost/api/area')
        .then(response => {
            setArea(response.data);
        })
        .catch(error => {
            console.log(`지역 연동에 실패했습니다. 네트워크를 확인해주세요: ${error}`);
        })

        axios.get('http://localhost/api/stadium')
        .then(response => {
            setStadium(response.data);
            // console.log(response);
        })
        .catch(error => {
            console.log(`구장 연동에 실패했습니다. 네트워크를 확인해주세요: ${error}`);
        })
    },[]);

    const filterStadium = stadium.filter(((item) => item.stadiumName.toLowerCase().includes(searchText.toLowerCase()) && 
        (selectText == '' || selectText == 'default') ? item.provinceId : item.provinceId == selectText));

    const searchInputHandler = (e) => {
        const value = e.target.value;
        setSearchText(value);
    }

    const selectHandler = (e) => {
        console.log('선택완료');
        const value = e.target.value;
        //console.log(value);
        setSelectText(value);
        setClickStadium('');
    }

    const onClickHandler = (stadiumNo) => {
        //console.log(stadiumNo);
        setClickStadium(stadiumNo);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const selectStadium = stadium.filter(item => item.stadiumNo == clickStadium);
        const stadiumName = selectStadium[0].stadiumName;
        let stadiumArea = '';
        let stadiumCity = '';

        switch(selectStadium[0].provinceId){
            case 1:
                stadiumArea = '서울';
                break;
            case 2:
                stadiumArea = '부산';
                break;
            case 3:
                stadiumArea = '대구';
            break;
            case 4:
                stadiumArea = '인천';
            break;
            case 5:
                stadiumArea = '광주';
            break;
            case 6:
                stadiumArea = '대전';
            break;
            case 7:
                stadiumArea = '울산';
            break;
            case 8:
                stadiumArea = '세종';
            break;
            case 9:
                stadiumArea = '경기';
            break;
            case 10:
                stadiumArea = '강원';
            break;
            case 11:
                stadiumArea = '충북';
            break;
            case 12:
                stadiumArea = '충남';
            break;
            case 13:
                stadiumArea = '전북';
            break;
            case 14:
                stadiumArea = '전남';
            break;
            case 15:
                stadiumArea = '경북';
            break;
            case 16:
                stadiumArea = '경남';
            break;
            case 17:
                stadiumArea = '제주';
            break;  
        }

        const stadiumCityArr = selectStadium[0].stadiumAddr.split(' ');

        stadiumCity = stadiumCityArr[1];

        console.log(stadiumCity);

        const update = {
            ...team,
            stadium: stadiumName,
            area: stadiumArea,
            city: stadiumCity,
        };

        setTeam(update);
        onClose();
    }

    return (
        <>
            <h2>홈 구장 검색</h2>
            <div className="search-content">
                <div className="area-select">
                    <select onChange={selectHandler}>
                        <option value="default">- 지역 -</option>
                        {area.map((local) => (
                            <option key={local.provinceId} value={local.provinceId}>{local.name}</option>
                        ))}
                    </select>
                    <input type="text" id="stadium" onChange={searchInputHandler} value={searchText} placeholder="구장을 입력해주세요"/>
                </div>
                <div className="stadium-div">
                    {filterStadium.map(list => (
                        <div className={(clickStadium == list.stadiumNo) ? "stadium-item search-active" : "stadium-item"} key={list.stadiumNo} onClick={() => onClickHandler(list.stadiumNo)}>
                            <h2>{list.stadiumName}</h2>
                            <p>{list.stadiumAddr}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="button-div">
                <button type="button" className="submit-btn" onClick={onSubmitHandler}>적용</button>
                <button type="button" className="close-btn" onClick={onClose}>닫기</button>
            </div>
        </>
    );
}