import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";

function CandidateDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchJobs = async () => {
      try {

        const keyword = searchParams.get("keyword") || "";
        const location = searchParams.get("location") || "";

        const res = await API.get(`/jobs?keyword=${keyword}&location=${location}`);
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs");
      }
    };
    fetchJobs();
  }, [searchParams]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container" style={{ width: "800px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Job Feed</h2>
        <div style={{ textAlign: "right" }}>
            <button 
              onClick={() => navigate("/my-applications")} 
              style={{ width: "auto", background: "#17a2b8", padding: "5px 15px", marginRight: "10px" }}
            >
              📂 My Applications
            </button>

            <span>Hello, {user?.name} </span>
            <button onClick={handleLogout} style={{ width: "auto", background: "#dc3545", padding: "5px 10px", marginLeft: "10px" }}>Logout</button>
            <button 
              onClick={() => navigate("/profile")} 
              style={{ width: "auto", background: "#6610f2", padding: "5px 15px", marginRight: "10px", marginLeft: "10px" }}
            >
              👤 Profile
            </button>
        </div>
      </div>

      {(searchParams.get("keyword") || searchParams.get("location")) && (
        <button onClick={() => navigate("/candidate-dashboard")} style={{ marginBottom: "20px", background: "#6c757d" }}>
          ❌ Clear Search Filters
        </button>
      )}

      {jobs.length === 0 ? <p>No jobs found matching your search.</p> : null}

      <div style={{ display: "grid", gap: "15px" }}>
        {jobs.map((job) => (
          <div key={job._id} style={{ 
            border: "1px solid #ddd", 
            padding: "20px", 
            borderRadius: "8px", 
            textAlign: "left",
            background: "#f9f9f9"
          }}>
            <h3 style={{ margin: "0 0 5px 0", color: "#007bff" }}>{job.title}</h3>
            <p style={{ margin: "5px 0", fontWeight: "bold" }}>{job.company} — {job.location}</p>
            <p style={{ margin: "5px 0", color: "#555" }}>💰 {job.salary} ({job.type})</p>
            
            <button 
                onClick={() => navigate(`/job/${job._id}`)}
                style={{ width: "150px", marginTop: "10px", background: "#28a745" }}
            >
                View & Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidateDashboard;