import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem("token");
      const res = await API.get("/quizzes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuizzes(res.data);
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h2>Available Quizzes</h2>
      {quizzes.map((quiz) => (
        <div key={quiz._id}>
          <h4>{quiz.title}</h4>
          <p>{quiz.description}</p>
          <Link to={`/quiz/${quiz._id}`}>Start Quiz</Link>
        </div>
      ))}
    </div>
  );
}

export default QuizList;
