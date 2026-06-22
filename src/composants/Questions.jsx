import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_QUESTION_API_URL
      );

      console.log("Questions :", res.data);

      setQuestions(res.data);
    } catch (error) {
      console.error(
        "Erreur chargement questions :",
        error
      );
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-5">
        Toutes les questions
      </h1>

      {questions.length === 0 ? (
        <p>Aucune question disponible.</p>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Questions;