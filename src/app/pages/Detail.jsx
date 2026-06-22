import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Commentaires from "../composants/Commentaires";

const Detail = () => {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [votes, setVotes] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getQuestion();
  }, [id]);

  const getQuestion = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/questions/${id}`
      );

      setQuestion(res.data);
      setVotes(res.data.votes ?? 0);

    } catch (error) {
      console.log(error);
    }
  };

  const handleVote = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Connectez-vous pour voter");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/questions/${id}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Recharge la question après le vote
      await getQuestion();

    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Erreur lors du vote"
      );
    }
  };

  if (!question) {
    return (
      <div className="text-center mt-10">
        Chargement...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-4">
        {question.title}
      </h1>

      {/* Auteur et date */}
      <div className="flex flex-wrap gap-5 text-gray-500 mb-6">
        <span>
          👤 {question.author?.prenom || "Utilisateur"}{" "}
          {question.author?.nom || ""}
        </span>

        <span>
          📅{" "}
          {new Date(
            question.createdAt
          ).toLocaleDateString()}
        </span>
      </div>

      {/* Description */}
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-700 leading-relaxed">
          {question.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-5">
        {question.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Votes */}
      <div className="mt-6">
        <button
          onClick={handleVote}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded"
        >
          👍 {votes} vote{votes > 1 ? "s" : ""}
        </button>
      </div>

      {/* Commentaires */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Commentaires
        </h2>

        <Commentaires questionId={id} />
      </div>

    </div>
  );
};

export default Detail;