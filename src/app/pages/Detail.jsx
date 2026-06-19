import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Commentaires from "../composants/Commentaires";

const Detail = () => {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/questions/${id}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!question) {
    return <h1>Chargement...</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-4">
        {question.titre}
      </h1>

      <div className="flex gap-5 text-gray-500 mb-5">
        <span>
          {question.author?.prenom} {question.author?.nom}
        </span>

        <span>
          {new Date(question.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="bg-white shadow rounded p-5">
        <p>{question.description}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {question.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Votes */}
      <div className="mt-5">
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          👍 {question.votes || 0}
        </button>
      </div>

      {/* Commentaires */}
      <Commentaires questionId={id} />
    </div>
  );
};

export default Detail;