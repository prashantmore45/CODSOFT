import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Safety Check: If someone goes to /result directly, send them back to Dashboard
  if (!state) {
    return (
      <div className="container">
        <p>No result found. Please take a quiz first.</p>
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Quiz Completed 🎉</h2>
      
      <div className="card" style={{ padding: "20px", display: "inline-block", border: "1px solid #ddd" }}>
        <h3>Your Score</h3>
        <h1 style={{ color: "#4CAF50", fontSize: "3rem", margin: "10px 0" }}>
          {state.score} / {state.total}
        </h1>
        <p>
            {state.score === state.total ? "Perfect Score! 🌟" : "Good job! Keep practicing."}
        </p>
      </div>

      <br />
      
      <button 
        onClick={() => navigate("/dashboard")}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default Result;