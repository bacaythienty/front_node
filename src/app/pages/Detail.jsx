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
      setVotes(res.data.votes || 0);

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

      const res = await axios.post(
        `${API_URL}/api/questions/${id}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVotes(res.data.votes);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Erreur vote"
      );

    }
  };


  if (!question) {
    return (
      <h1 className="text-center mt-10">
        Chargement...
      </h1>
    );
  }


  return (
    <div className="max-w-5xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-4">
        {question.title}
      </h1>


      <div className="flex gap-5 text-gray-500 mb-5">

        <span>
          {question.author?.prenom || "Utilisateur"}{" "}
          {question.author?.nom || ""}
        </span>


        <span>
          {new Date(
            question.createdAt
          ).toLocaleDateString()}
        </span>

      </div>



      <div className="bg-white shadow rounded p-5">

        <p>
          {question.description}
        </p>

      </div>



      <div className="mt-5 flex flex-wrap gap-2">

        {question.tags?.map((tag,index)=>(
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded"
          >
            #{tag}
          </span>
        ))}

      </div>




      {/* Vote */}

      <div className="mt-5">

        <button
          onClick={handleVote}
          className="bg-green-500 text-white px-5 py-2 rounded"
        >
          👍 {votes} votes
        </button>

      </div>




      {/* Commentaires */}

      <div className="mt-10">

        <Commentaires 
          questionId={id}
        />

      </div>


    </div>
  );
};


export default Detail;