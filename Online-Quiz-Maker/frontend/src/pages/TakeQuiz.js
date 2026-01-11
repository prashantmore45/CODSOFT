import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      const token = localStorage.getItem("token");
      const res = await API.get(`/quizzes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuiz(res.data);
    };
    fetchQuiz();
  }, [id]);

  if (!quiz) return <p>Loading...</p>;

  const handleAnswer = (option) => {
    if (option === quiz.questions[current].correctAnswer) {
      setScore(score + 1);
    }

    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
    } else {
      navigate("/result", {
        state: {
          score,
          total: quiz.questions.length,
        },
      });
    }
  };

  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>{quiz.questions[current].questionText}</p>
      {quiz.questions[current].options.map((opt, i) => (
        <button key={i} onClick={() => handleAnswer(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
}

export default TakeQuiz;
