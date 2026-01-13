import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchMyApps = async () => {
      try {
        // We need a new backend route for this (we will add it in Step 4)
        const res = await API.get("/application/my-applications");
        setApplications(res.data);
      } catch (error) {
        console.error("Failed to fetch applications");
      }
    };
    fetchMyApps();
  }, []);

  return (
    <div className="container" style={{ width: "800px" }}>
      <button onClick={() => navigate("/candidate-dashboard")} style={{ background: "#6c757d", width: "auto", marginBottom: "20px" }}>← Back to Dashboard</button>
      
      <h2>My Job Applications</h2>
      
      {applications.length === 0 ? <p>You haven't applied to any jobs yet.</p> : null}

      <div style={{ display: "grid", gap: "15px" }}>
        {applications.map((app) => (
          <div key={app._id} style={{ 
            border: "1px solid #ddd", 
            padding: "20px", 
            borderRadius: "8px", 
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <h3 style={{ margin: "0 0 5px 0", color: "#007bff" }}>{app.job.title}</h3>
              <p style={{ margin: "0", color: "#555" }}>{app.job.company} • {app.job.location}</p>
              <small style={{ color: "#999" }}>Applied on: {new Date(app.createdAt).toLocaleDateString()}</small>
            </div>

            {/* Status Badge */}
            <span style={{
              padding: "8px 15px",
              borderRadius: "20px",
              fontWeight: "bold",
              background: app.status === "applied" ? "#ffeeba" : "#d4edda", // Yellow for applied, Green for others
              color: app.status === "applied" ? "#856404" : "#155724"
            }}>
              {app.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyApplications;