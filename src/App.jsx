import Router from "./routes/Router";
import "./app.css";
import QueryProvider from "./components/auth/QueryProvider";

function App() {
  return (
    <div className="App">
      <QueryProvider>
        <Router />
      </QueryProvider>
    </div>
  );
}
export default App;
