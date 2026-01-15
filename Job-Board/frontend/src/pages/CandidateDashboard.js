import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";

function CandidateDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);

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

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Job Feed</h2>
        
        <button 
          onClick={() => navigate("/my-applications")} 
          style={{ width: "auto", background: "#17a2b8", color: "white", padding: "10px 20px" }}
        >
          📂 My Applications
        </button>
      </div>

      {(searchParams.get("keyword") || searchParams.get("location")) && (
        <button onClick={() => navigate("/candidate-dashboard")} style={{ width: "auto", marginBottom: "20px", background: "#6c757d", color: "white" }}>
          ❌ Clear Search Filters
        </button>
      )}

      {jobs.length === 0 ? <p>No jobs found matching your search.</p> : null}

      <div className="job-grid">
        {jobs.map((job) => (
          <div key={job._id} className="card">
            <div>
              <h3 style={{ margin: "0 0 5px 0", color: "#007bff" }}>{job.title}</h3>
              <p style={{ margin: "5px 0", fontWeight: "bold" }}>{job.company}</p>
              <p style={{ margin: "0", color: "#555" }}>📍 {job.location}</p>
              <p style={{ margin: "5px 0", color: "#28a745", fontWeight: "bold" }}>💰 {job.salary}</p>
            </div>
            
            <button 
                onClick={() => navigate(`/job/${job._id}`)}
                style={{ marginTop: "15px", background: "#007bff", color: "white" }}
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