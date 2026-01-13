import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [search, setSearch] = useState({ keyword: "", location: "" });

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await API.get("/jobs");
        setFeaturedJobs(res.data.slice(0, 3)); 
      } catch (error) {
        console.error("Error fetching jobs");
      }
    };
    fetchFeatured();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/candidate-dashboard?keyword=${search.keyword}&location=${search.location}`);
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      
      <div style={{ 
        background: "linear-gradient(135deg, #007bff, #6610f2)", 
        color: "white", 
        padding: "80px 20px",
        marginBottom: "40px"
      }}>
        <h1 style={{ fontSize: "3rem", margin: "0" }}>Find Your Dream Job</h1>
        <p style={{ fontSize: "1.2rem", opacity: "0.9" }}>Browse thousands of job openings from top companies.</p>
        
        <form onSubmit={handleSearch} style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          <input 
            placeholder="Job Title (e.g. React Developer)" 
            value={search.keyword}
            onChange={(e) => setSearch({...search, keyword: e.target.value})}
            style={{ padding: "15px", width: "300px", borderRadius: "5px", border: "none" }}
          />
          <input 
            placeholder="Location (e.g. New York)" 
            value={search.location}
            onChange={(e) => setSearch({...search, location: e.target.value})}
            style={{ padding: "15px", width: "200px", borderRadius: "5px", border: "none" }}
          />
          <button type="submit" style={{ padding: "15px 30px", background: "#ffc107", color: "#333", border: "none", fontWeight: "bold", cursor: "pointer", borderRadius: "5px" }}>
            Search Jobs
          </button>
        </form>
      </div>

      <div className="container" style={{ width: "800px", margin: "0 auto" }}>
        <h2 style={{ color: "#333", marginBottom: "20px" }}>🔥 Featured Jobs</h2>
        
        <div style={{ display: "grid", gap: "15px", textAlign: "left" }}>
          {featuredJobs.map((job) => (
            <div key={job._id} style={{ 
              border: "1px solid #ddd", 
              padding: "20px", 
              borderRadius: "8px", 
              background: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
            }}>
              <h3 style={{ margin: "0 0 5px 0", color: "#007bff" }}>{job.title}</h3>
              <p style={{ margin: "5px 0" }}>{job.company} • {job.location}</p>
              <button 
                onClick={() => navigate("/login")} 
                style={{ marginTop: "10px", background: "none", color: "#007bff", border: "1px solid #007bff", padding: "5px 15px" }}
              >
                Login to Apply
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;