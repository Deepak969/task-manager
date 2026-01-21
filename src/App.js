import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import TaskPage from "./pages/TaskPage";
import CreatTask from "./components/TaskPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatTask />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-tasks" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
