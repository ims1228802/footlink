import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Team from '../pages/team/Team';
import TeamDetail from '../pages/team/TeamDetail';
import NewTeam from '../pages/team/NewTeam';
import NewTeamNext from '../pages/team/NewTeamNext';
import MyInfo from "../pages/user/MyInfo.jsx";
import Main from "../pages/user/Main.jsx";
import FindEmail from "../pages/user/FindEmail.jsx";
import FindPassword from "../pages/user/FindPassword.jsx";
import SignUp from "../pages/user/SignUp.jsx";
import LoginPage from "../pages/user/LoginPage.jsx";

const router = createBrowserRouter([
  {path: "/", element: <Navigate to="/login"/>},
  {path: '/login', element: <LoginPage />},
  {path: '/signup', element: <SignUp />},
  {path: '/FindEmail', element: <FindEmail />},
  {path: '/FindPassword', element: <FindPassword />},
  {path: '/teamList', element: <Team />},
  {path: '/teamDetail', element: <TeamDetail />},
  {path: '/newTeam', element: <NewTeam />},
  {path: '/newTeamNext', element: <NewTeamNext />},
])

export default function Router(){
    return(
        <RouterProvider router={router} />
    );
}