import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function EmployerDashboard() {
  const navigate = useNavigate();
  const [myJobs, setMyJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch all jobs and filter 
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        const userJobs = res.data.filter(job => job.postedBy === user._id);
        setMyJobs(userJobs);
      } catch (error) {
        console.error("Error fetching jobs");
      }
    };
    fetchJobs();
  }, [user._id]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container" style={{ width: "900px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Employer Dashboard</h2>
        <div>
          <span style={{ marginRight: "15px", fontWeight: "bold" }}>{user?.name}</span>
          <button onClick={handleLogout} style={{ width: "auto", background: "#dc3545", padding: "5px 15px" }}>Logout</button>
          <button 
            onClick={() => navigate("/profile")} 
            style={{ width: "auto", background: "#6610f2", padding: "5px 15px", marginRight: "10px", marginLeft: "10px" }}
          >
            👤 Profile
          </button>
        </div>
      </div>

      <div style={{ marginTop: "30px", marginBottom: "30px" }}>
        <button 
          onClick={() => navigate("/post-job")}
          style={{ padding: "15px 30px", fontSize: "1.1rem", background: "#28a745" }}
        >
          + Post a New Job
        </button>
      </div>

      <h3>Your Posted Jobs</h3>
      {myJobs.length === 0 ? <p style={{ color: "#777" }}>You haven't posted any jobs yet.</p> : null}

      <div style={{ display: "grid", gap: "15px" }}>
        {myJobs.map((job) => (
          <div key={job._id} style={{ 
            background: "#f8f9fa", 
            padding: "20px", 
            borderRadius: "8px", 
            borderLeft: "5px solid #007bff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <h3 style={{ margin: "0 0 5px 0" }}>{job.title}</h3>
              <p style={{ margin: "0", color: "#555" }}>{job.location} • {job.type}</p>
            </div>
            
            <button 
              onClick={() => navigate(`/applications/${job._id}`)}
              style={{ width: "auto", background: "#17a2b8" }}
            >
              View Applicants 👥
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployerDashboard;