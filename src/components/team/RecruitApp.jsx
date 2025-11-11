import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';

export default function RecruitApp({ teamCode, onClose }) {
    const [ data, setData ] = useState(null);
    const [ recruitUser, setRecruitUser ] = useState([]);
    const [ teamRecruitCode, setTeamRecruitCode ] = useState('');

    let recruitAplyCode = '';

    useEffect(() => {
        apiFunction();
    },[])

    const apiFunction = async() => {
        await axios.get(`http://localhost/api/team/recruitInfo?teamCode=${teamCode}`)
        .then(response =>{
            console.log(response.data);
            setData(response.data);
            recruitAplyCode = response.data.recruitAplyCode;
            setTeamRecruitCode(response.data.recruitAplyCode);
        })
        .catch(error => {
            console.error(error);
        })

        await axios.get(`http://localhost/api/team/userRecruit?recruitAplyCode=${recruitAplyCode}`)
        .then(response =>{
            console.log(recruitAplyCode);
            console.log(response.data);
            setRecruitUser(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }

    const onClickHandler = (selected, userId) => {
        switch(selected){
            case 'accept':
                if(confirm('신청을 수락 하시겠습니까?')){
                    axios.post('http://localhost/api/team/acceptUser', {
                        recruitAplyCode: teamRecruitCode,
                        teamCode: teamCode,
                        userId: userId,
                    })
                    .then(response => {
                        console.log(response.data);
                        alert(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    })
                }
            break;
            case 'reject':
                if(confirm('신청을 거절 하시겠습니까?')){
                    axios.delete('http://localhost/api/team/rejectUser', {
                        params: {
                            recruitAplyCode: teamRecruitCode,
                            userId: userId,
                        }
                    }
                    )
                    .then(response => {
                        console.log(response.data);
                        alert(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    })
                }
            break;
        }
    }

    return(
        <>
            <div className="recruit-app-contents">
                <h2>모집 신청 내역</h2>
                <p>모집 신청한 사용자 목록</p>
            </div>
            <div className="recruit-app-list">
                {recruitUser.length > 0 ? recruitUser.map(item => (
                    <div className="user-app" key={item.id}>
                        <div className="user-profile">
                            <span>{item.name}</span>
                        </div>
                        <div className="user-info">
                            <span>{item.contents}</span>
                        </div>
                        <div className="recruit-button-div">
                            <button className="fill-btn" onClick={() => onClickHandler('accept', item.id)}>수락</button>
                            <button className="delete-btn" onClick={() => onClickHandler('reject', item.id)}>거절</button>
                        </div>
                    </div>
                )) : (
                <div className="none-list">
                    모집 신청한 내역이 없습니다.
                </div>
                )}
            </div>
            <div className="button-div">
                <button className="close-btn" onClick={onClose}>닫기</button>
            </div>
        </>
    )
}