import React from 'react';
import { useUser } from '../../hooks/useUser';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddRecruit({ onClose, teamCode }) {
    const {data: user, isLoading} = useUser();
    const [ recruitContents, setRecruitContents ] = useState('');
    const [ data, setData ] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost/api/team/recruitInfo?teamCode=${teamCode}`)
        .then(response =>{
            console.log(response.data);
            setData(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    },[]);

    console.log(data);

    const onChangeHandler = (e) => {
        setRecruitContents(e.target.value);
    }

    const recruitHandler = () => {
        axios.post('http://localhost/api/team/appRecruit', {
            recruitAplyCode: data.recruitAplyCode,
            contents: recruitContents,
            userId: user.id
        })
        .then(response => {
            console.log(response.data);
            alert(response.data);
            onClose();
        })
        .catch(error => {
            console.error(error);
        })
    }

    return(
        <>
            <div className="add-recruit-contents">
                <h2>가입 신청하기</h2>
                <p>해당 팀에 가입 신청합니다</p>
            </div>
            <div className="add-recruit-detail">
                <p>신청내용</p>
                <textarea value={recruitContents} onChange={onChangeHandler}/>
            </div>
            <div className='button-div'>
                <button type='button' className='close-btn' onClick={onClose}>닫기</button>
                <button type='button' className='fill-btn' onClick={recruitHandler}>신청하기</button>
            </div>
        </>
    )
}