import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // ✅ API.js automatically attaches the token now!
        const res = await API.get("/quizzes");
        setQuizzes(res.data);
      } catch (error) {
        console.error("Failed to fetch quizzes");
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="container">
      <h2>Available Quizzes</h2>
      <div className="quiz-list">
        {quizzes.length === 0 ? <p>No quizzes available yet.</p> : null}
        
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="card" style={{border: '1px solid #ddd', padding: '15px', marginBottom: '10px'}}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <Link to={`/quiz/${quiz._id}`}>
              <button>Start Quiz</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;