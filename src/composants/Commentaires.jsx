import React, { useEffect, useState } from "react";
import axios from "axios";

const Commentaires = ({ questionId }) => {
  const [commentaire, setCommentaire] = useState("");
  const [commentaires, setCommentaires] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCommentaires = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/commentaires/${questionId}`
      );

      setCommentaires(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCommentaires();
  }, [questionId]);

  const ajouterCommentaire = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Connectez-vous pour commenter");
      return;
    }

    if (!commentaire.trim()) {
      alert("Veuillez écrire un commentaire");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/commentaires/${questionId}`,
        {
          contenu: commentaire,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCommentaire("");
      fetchCommentaires();

    } catch (error) {
      console.log(error.response?.data);
      alert("Erreur lors de l'ajout du commentaire");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Commentaires ({commentaires.length})
      </h2>

      <textarea
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        placeholder="Ajouter un commentaire..."
        className="w-full border rounded p-3"
      />

      <button
        onClick={ajouterCommentaire}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Commenter
      </button>

      <div className="mt-6 space-y-4">
        {commentaires.map((com) => (
          <div
            key={com._id}
            className="border rounded p-4 bg-gray-50"
          >
            <p className="font-semibold">
              {com.auteur?.prenom || "Utilisateur"}{" "}
              {com.auteur?.nom || ""}
            </p>

            <p className="mt-2">{com.contenu}</p>

            <p className="text-sm text-gray-500 mt-2">
              {new Date(com.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commentaires;