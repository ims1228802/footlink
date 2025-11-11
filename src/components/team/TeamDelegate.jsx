import axios from "axios";
import React from "react";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";

export default function TeamDelegate({ membersData, onClose, teamCode }) {
    const {data: user, isLoading} = useUser();
    const [ selectedMemberId, setSelectedMemberId ] = useState(null);

    console.log(membersData);

    const handleMemberClick = (userId) => {
        setSelectedMemberId(userId);
    }

    const teamDelegate = () => {
        if(selectedMemberId == user.id){
            alert('자기 자신은 선택할 수 없습니다.');
            return;
        }

        axios.put('http://localhost/api/team/delegate', {
            teamCode: teamCode,
            selectedId: selectedMemberId,
            userId: user.id,
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
            <h2>팀 위임하기</h2>
            <div className="delegate-contents">
                <p>다음 팀장, 너로 정했다!</p>
                <p>팀장으로 위임할 멤버를 선택해주세요.</p>
            </div>   
            <div className="member-list-container">
                <div className="member-list">
                    {membersData.map(member => (
                        <div
                            key={member.userId}
                            className={`member-item ${member.userId == selectedMemberId ? 'selected' : ''}`}
                            onClick={() => handleMemberClick(member.userId)}
                        >
                            <div className="profile-image">
                                {/* 실제 이미지 경로는 상황에 맞게 수정해야 합니다. */}
                                <img src={member.imageUrl} alt={`${member.name} 프로필`} />
                            </div>
                            <div className="member-info">
                                <span className="name">{member.name}</span>
                                <span className="role">{member.level}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="button-div">
                <button className="close-btn" onClick={onClose}>닫기</button>
                <button className="fill-btn" onClick={teamDelegate}>위임하기</button>
            </div>
        </>
    )
}