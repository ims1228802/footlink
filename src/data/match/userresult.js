export const teamData = {   // 매치 상세페이지에서 사용자 기록을 나타내는 테이블 데이터 
    matchId: 'match_001',
    matchDate: '2025-10-26',
    games: [
        {
            gameNumber: 1,
            teams: [
                {
                    name: '패트 풋살',
                    status: '승',
                    score : '4',
                    players: [
                        { name: '한찬희', level: '세미프로1', goals: 2, assists: 1, saves: 0 },
                        { name: '홍길동', level: '프로', goals: 1, assists: 1, saves: 0 },
                        { name: '김현승', level: '아마추어4', goals: 0, assists: 0, saves: 4 },
                        { name: '윤재현', level: '아마추어5', goals: 0, assists: 1, saves: 0 },
                        { name: '황승현', level: '아마추어3', goals: 1, assists: 1, saves: 0 },
                    ]
                },
                {
                    name: '임시팀',
                    status: '패',
                    score: '2',
                    players: [
                        { name: '백민철', level: '세미프로1', goals: 2, assists: 1, saves: 0 },
                        { name: '홍경민', level: '프로', goals: 1, assists: 1, saves: 0 },
                        { name: '오강현', level: '아마추어4', goals: 0, assists: 0, saves: 4 },
                        { name: '윤설', level: '아마추어5', goals: 0, assists: 1, saves: 0 },
                        { name: '이도원', level: '아마추어3', goals: 1, assists: 1, saves: 0 },
                    ]
                }
            ]
        },
        {
            gameNumber: 2,
            teams: [
                {
                    name: '패트 풋살',
                    status: '패',
                    score: '2',
                    players: [
                        { name: '한찬희', level: '세미프로1', goals: 2, assists: 1, saves: 0 },
                        { name: '홍길동', level: '프로', goals: 1, assists: 1, saves: 0 },
                        { name: '김현승', level: '아마추어4', goals: 0, assists: 0, saves: 4 },
                        { name: '윤재현', level: '아마추어5', goals: 0, assists: 1, saves: 0 },
                        { name: '황승현', level: '아마추어3', goals: 1, assists: 1, saves: 0 },
                    ]
                },
                {
                    name: '임시팀',
                    status: '승',
                    score : '1',
                    players: [
                        { name: '백민철', level: '세미프로1', goals: 2, assists: 1, saves: 0 },
                        { name: '홍경민', level: '프로', goals: 1, assists: 1, saves: 0 },
                        { name: '오강현', level: '아마추어4', goals: 0, assists: 0, saves: 4 },
                        { name: '윤설', level: '아마추어5', goals: 0, assists: 1, saves: 0 },
                        { name: '이도원', level: '아마추어3', goals: 1, assists: 1, saves: 0 },
                    ]
                }
            ]
        }
    ]
};