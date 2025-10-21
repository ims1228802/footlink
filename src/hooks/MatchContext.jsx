import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';


const MatchContext = createContext(null);

function MatchProvider({ children }) {
    const [matches, setMatches] = useState([]);
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get('http://localhost/api/Match/matchList');
                const updatedList = response.data.matchList.map(checkAndUpdateStatus);
                setMatches(updatedList);
                setProvinces(response.data.pro); // API로부터 지역 데이터 설정
            } catch (error) {
                console.error("매치 목록을 불러오는 중 오류 발생:", error);
                setMatches([]);
                setProvinces([]);
            }
        };
        fetchMatches();
    }, []);

    const checkAndUpdateStatus = (match) => {
        if (match.matchStts === '매치 종료') {
            return match;
        }
        if (match.applyCount >= match.totalPlayers) {
            return { ...match, matchStts: '모집완료' };
        }
        return match;
    };

    const applyToMatch = (matchId) => {
        setMatches(prevMatches =>
            prevMatches.map(match => {
                if (match.matchNo === matchId) {
                    const newApplyCount = match.applyCount + 1;
                    const updatedMatch = { ...match, applyCount: newApplyCount };
                    return checkAndUpdateStatus(updatedMatch);
                }
                return match;
            })
        );
    };

    const value = { matches, provinces, applyToMatch };

    return (
        <MatchContext.Provider value={value}>
            {children}
        </MatchContext.Provider>
    );
}

export function useMatches() {
    const context = useContext(MatchContext);
    if (!context) {
        throw new Error('useMatches는 반드시 MatchProvider 안에서 사용해야 합니다.');
    }
    return context;
}

export default MatchProvider;