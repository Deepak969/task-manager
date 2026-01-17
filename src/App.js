import { BrowserRouter, Routes, Route } from "react-router-dom";
//import LoginPage from "./pages/LoginPage";
import LoginPage from "./components/Login";
import TaskPage from "./components/TaskPage";
import Dashboard from "./components/Dashboard";

// import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
