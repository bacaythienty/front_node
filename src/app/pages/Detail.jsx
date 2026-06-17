import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        {question.title}
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

      <div className="mt-5">
        {question.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded mr-2"
          >
            {tag}
          </span>
        ))}
      </div>

    </div>
  );
};

export default Detail;