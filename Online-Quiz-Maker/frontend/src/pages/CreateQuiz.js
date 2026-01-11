import { useState } from "react";
import API from "../services/api";

function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await API.post(
      "/quizzes",
      {
        title,
        questions: [
          {
            questionText: question,
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correctAnswer: "Option 1",
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Quiz created");
  };

  return (
    <div>
      <h2>Create Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Quiz Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Question"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateQuiz;
