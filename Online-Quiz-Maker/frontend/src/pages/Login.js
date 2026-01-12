import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom"; // Import Link

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    
    <div className="container" style={{ marginTop: "50px" }}>
      <h2>Welcome Back</h2>
      <p style={{ color: "#94a3b8", marginBottom: "20px" }}>Please login to your account</p>
      
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      
      <p style={{ marginTop: "20px" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;