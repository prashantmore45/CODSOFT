import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get("/quizzes");
        setQuizzes(res.data);
      } catch (error) {
        console.error("Failed to fetch quizzes");
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="container quiz-list-container">
      <h2>Available Quizzes</h2>
      
      {quizzes.length === 0 ? <p>No quizzes available yet.</p> : null}

      <div className="quiz-grid">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-card">
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