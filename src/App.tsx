import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/sidebar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* 사이드바 */}
        <Sidebar />
      </div>
    </Router>
  );
}

export default App;