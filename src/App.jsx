import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./index.css";
import HomePage from "./pages/match/match.jsx";
import ResultPage from './pages/match/result.jsx';
import EndPage from './pages/match/end.jsx'
import SelectField from './pages/match/selectfield.jsx';
import SelectMatch from './pages/match/selectmatch.jsx';
import SelectDetail from './pages/match/selectdetail.jsx';




const router = createBrowserRouter([
  { path : '/', element : <HomePage /> },
  { path : '/result', element : <ResultPage />},
  { path : '/end' , element : <EndPage />},
  { path : '/selectfield', element : <SelectField />},
  { path : '/selectmatch', element : <SelectMatch />},
  { path : '/selectdetail', element : <SelectDetail />}
]);

function App() {
  return (
    <RouterProvider router= { router }/>
  );
}
export default App;