import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    type: "Full-time"
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // The token in API.js handles the "Who am I?" part automatically
      await API.post("/jobs", formData);
      alert("Job Posted Successfully!");
      navigate("/employer-dashboard");
    } catch (error) {
      alert("Failed to post job.");
    }
  };

  return (
    <div className="container" style={{ width: "500px" }}>
      <h2>Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title (e.g. React Dev)" onChange={handleChange} required />
        <input name="company" placeholder="Company Name" onChange={handleChange} required />
        <input name="location" placeholder="Location (e.g. Remote)" onChange={handleChange} required />
        <input name="salary" placeholder="Salary (e.g. $50k/year)" onChange={handleChange} required />
        
        <select name="type" onChange={handleChange}>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>

        <textarea 
          name="description" 
          placeholder="Job Description..." 
          onChange={handleChange} 
          rows="5"
          required
          style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "4px", borderColor: "#ddd" }}
        />

        <button type="submit">Post Job</button>
        <button type="button" onClick={() => navigate("/employer-dashboard")} style={{ background: "#6c757d", marginTop: "10px" }}>Cancel</button>
      </form>
    </div>
  );
}

export default PostJob;