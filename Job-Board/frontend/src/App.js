import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostJob from "./pages/PostJob"; 
import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard"; // Ensure imported
import JobDetails from "./pages/JobDetails";
import ApplicationsList from "./pages/ApplicationsList";


function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/applications/:jobId" element={<ApplicationsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;