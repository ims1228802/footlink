import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

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
import AdminMatch from "../pages/match/adminMatch.jsx";
import AddResult from "../pages/match/AddResult.jsx";
import EditResult from "../pages/match/MatchResultEdit.jsx";
//user
import LoginPage from "../pages/user/LoginPage.jsx";
import SignUp from "../pages/user/SignUp.jsx";
import Welcome from "../pages/user/Welcome.jsx";
import FindEmail from "../pages/user/FindEmail.jsx";
import FindPassword from "../pages/user/FindPassword.jsx";
import MyInfo from "../pages/user/MyInfo.jsx";
import Modify from "../pages/user/Modify.jsx";
import MyTeam from "../pages/user/MyTeam.jsx";
import LikeMatches from "../pages/user/LikeMatches.jsx";
import CompletedMatches from "../pages/user/CompletedMatches.jsx";
import AppliedMatches from "../pages/user/AppliedMatches.jsx";
import NewTeamRecruit from "../pages/team/NewTeamRecruit.jsx";
import NewTeamRecruitNext from "../pages/team/NewTeamRecruitNext.jsx";
import Notice from "../pages/user/Notice.jsx";
import NoticeDetail from "../pages/user/NoticeDetail.jsx";
import Faq from "../pages/user/Faq.jsx";
import FaqDetail from "../pages/user/FaqDetail.jsx";
import Settings from "../pages/user/Settings.jsx";
import UserLevel from "../pages/user/UserLevel.jsx";
import PhoneEdit from "../pages/user/PhoneEdit.jsx";
import PasswordReset from "../pages/user/PasswordReset.jsx";


const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/main" /> },
  { path: "/main", element: <Main /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/welcome", element: <Welcome /> },
  { path: "/find-Email", element: <FindEmail /> },
  { path: "/find-Password", element: <FindPassword /> },
  { path: "modify", element: <Modify /> },
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
  { path: "/end/:matchNo", element :<ResultPage /> },
  { path: "/adminMatch", element :<AdminMatch /> },
  { path: "/addResult/:matchNo", element :<AddResult /> },
  { path: "/editResult/:matchNo", element :<EditResult /> },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <MypageLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "my-info", element: <MyInfo /> },
      { path: "modify", element: <Modify /> },
      { path: "my-team", element: <MyTeam /> },
      { path: "like-matches", element: <LikeMatches /> },
      { path: "applied-matches", element: <AppliedMatches /> },
      { path: "completed-matches", element: <CompletedMatches /> },
      { path: "notice", element: <Notice /> },
      { path: "notice/:id", element: <NoticeDetail /> },
      { path: "faq", element: <Faq /> },
      { path: "faq/:id", element: <FaqDetail /> },
      { path: "settings", element: <Settings /> },
      { path: "user-level", element: <UserLevel /> }, 
      { path: "edit-phone", element :<PhoneEdit /> },
      { path: "reset-password", element: <PasswordReset /> },       
    ],
  },
 
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
