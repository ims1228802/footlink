import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

//main
import Main from "../pages/Main.jsx";
//layout
import MypageLayout from "../layout/MypageLayout.jsx";

//team
import Team from "../pages/team/Team";
import TeamDetail from "../pages/team/TeamDetail";
import NewTeam from "../pages/team/NewTeam";
import NewTeamNext from "../pages/team/NewTeamNext";
//match
import HomePage from "../pages/match/Match.jsx";
import ResultPage from "../pages/match/result.jsx";
import EndPage from "../pages/match/End.jsx";
import SelectField from "../pages/match/SelectField.jsx";
import SelectMatch from "../pages/match/SelectMatch.jsx";
import SelectDetail from "../pages/match/SelectDetail.jsx";
import MatchDetailPage from "../pages/match/MatchDetail.jsx";
//user
import LoginPage from "../pages/user/LoginPage.jsx";
import SignUp from "../pages/user/SignUp.jsx";
import Welcome from "../pages/user/Welcome.jsx";
import FindEmail from "../pages/user/FindEmail.jsx";
import FindPassword from "../pages/user/FindPassword.jsx";
import MyInfo from "../pages/user/MyInfo.jsx";
import MyTeams from "../pages/user/MyTeams.jsx";
import LikeMatches from "../pages/user/LikeMatches.jsx";
import CompletedMatches from "../pages/user/CompletedMatches.jsx";
import AppliedMatches from "../pages/user/AppliedMatches.jsx";
import NewTeamRecruit from "../pages/team/NewTeamRecruit.jsx";
import NewTeamRecruitNext from "../pages/team/NewTeamRecruitNext.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/main" /> },
  { path: "/main", element: <Main /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/welcome", element: <Welcome /> },
  { path: "/find-Email", element: <FindEmail /> },
  { path: "/find-Password", element: <FindPassword /> },
  { path: "/teamList", element: <Team /> },
  { path: "/teamDetail", element: <TeamDetail /> },
  { path: "/newTeam", element: <NewTeam /> },
  { path: "/newTeamRecruit", element: <NewTeamRecruit /> },
  { path: "/newTeamNext", element: <NewTeamNext /> },
  { path: "/newTeamRecruitNext", element: <NewTeamRecruitNext /> },
  { path: "/match", element: <HomePage /> },
  { path: "/result", element: <ResultPage /> },
  { path: "/end", element: <EndPage /> },
  { path: "/selectfield", element: <SelectField /> },
  { path: "/selectmatch", element: <SelectMatch /> },
  { path: "/selectdetail", element: <SelectDetail /> },
  { path: "/match/:matchNo", element :<MatchDetailPage /> },
  {
    path: "/user",
    element: <MypageLayout />,
    children: [
      { path: "my-info", element: <MyInfo /> },
      { path: "my-teams", element: <MyTeams /> },
      { path: "like-matches", element: <LikeMatches /> },
      { path: "applied-matches", element: <AppliedMatches /> },
      { path: "completed-match", element: <CompletedMatches /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
