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
      try {
        // ✅ No need for manual headers
        const res = await API.get(`/quizzes/${id}`);
        setQuiz(res.data);
      } catch (error) {
        console.error("Failed to load quiz");
      }
    };
    fetchQuiz();
  }, [id]);

  if (!quiz) return <div className="container">Loading Quiz...</div>;

  const handleAnswer = (selectedOption) => {
    const currentQuestion = quiz.questions[current];
    let newScore = score;

    // 1. Calculate the new score immediately
    if (selectedOption === currentQuestion.correctAnswer) {
      newScore = score + 1;
    }
    setScore(newScore);

    // 2. Decide: Next Question or Finish?
    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
    } else {
      // ✅ Pass the ACCURATE 'newScore', not the old 'score'
      navigate("/result", {
        state: {
          score: newScore,
          total: quiz.questions.length,
        },
      });
    }
  };

  return (
    <div className="container">
      <h2>{quiz.title}</h2>
      <p>
        Question {current + 1} / {quiz.questions.length}
      </p>

      <div className="card">
        <h3>{quiz.questions[current].questionText}</h3>
        
        <div className="options-grid">
          {quiz.questions[current].options.map((opt, i) => (
            <button
              key={i}
              className="option-btn"
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TakeQuiz;