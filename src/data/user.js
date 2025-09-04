{
  /*더미데이터*/
}

import { userTeams } from "./userTeams";

export const user = {
  id: "1",
  email: "dayday@gmail.com",
  name: "홍길동",
  level: "비기너1",
  position: ["골키퍼", "수비형"],
  location: "전북 전주시 완산구",
  teams: userTeams.map((team) => team.name),
  introduction:
    "축구를 좋아하는 평범한 직장인입니다. 주말마다 뛰며 스트레스를 날려요!",
};

export const matchStats = {
  totalGames: 10,
  mvpCount: 3,
  lastActivity: "10일전",
};
