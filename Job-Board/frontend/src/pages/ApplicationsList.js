import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function ApplicationsList() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get(`/application/${jobId}`);
        setApplications(res.data);
      } catch (error) {
        alert("Failed to fetch applications.");
      }
    };
    fetchApplications();
  }, [jobId]);

  return (
    <div className="container" style={{ width: "800px" }}>
      <button onClick={() => navigate("/employer-dashboard")} style={{ background: "#6c757d", width: "auto", marginBottom: "20px" }}>← Back to Dashboard</button>
      
      <h2>Applicants for this Job</h2>
      
      {applications.length === 0 ? <p>No applications yet.</p> : null}

      <div style={{ display: "grid", gap: "15px" }}>
        {applications.map((app) => (
          <div key={app._id} style={{ 
            border: "1px solid #ddd", 
            padding: "15px", 
            borderRadius: "8px", 
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fff"
          }}>
            <div>
              <h3 style={{ margin: "0", color: "#333" }}>{app.applicant.name}</h3>
              <p style={{ margin: "5px 0", color: "#666" }}>{app.applicant.email}</p>
              <small style={{ color: "#999" }}>Applied on: {new Date(app.createdAt).toLocaleDateString()}</small>
            </div>

            <a 
              href={`http://localhost:5000/${app.resume.replace(/\\/g, "/")}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                background: "#007bff",
                color: "white",
                padding: "10px 15px",
                borderRadius: "5px",
                fontWeight: "bold"
              }}
            >
              📄 Download Resume
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicationsList;