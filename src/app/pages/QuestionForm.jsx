import React, { useState } from "react";
import axios from "axios";

const QuestionForm = () => {
  const Questions_API_URL = import.meta.env.VITE_QUESTION_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      tags: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Veuillez vous connecter avant de publier une question.");
      return;
    }

    if (!formData.title.trim()) {
      alert("Le titre est obligatoire");
      return;
    }

    if (!formData.description.trim()) {
      alert("La description est obligatoire");
      return;
    }

    try {
      setLoading(true);

      const questionData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      };

      console.log("Données envoyées :", questionData);

      const response = await axios.post(
        Questions_API_URL,
        questionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Réponse :", response.data);

      alert("Question publiée avec succès ✅");

      handleReset();
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Erreur lors de la publication de la question";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Poser une question
        </h1>

        <p className="text-gray-500 mb-8">
          Soyez précis et fournissez suffisamment de détails pour obtenir une
          réponse utile.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titre */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Titre
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Comment utiliser useEffect dans React ?"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description détaillée
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="8"
              placeholder="Décrivez votre problème en détail..."
              className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Tags
            </label>

            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="react, javascript, nodejs"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-sm text-gray-500 mt-1">
              Séparez les tags par une virgule.
            </p>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
            >
              {loading ? "Publication..." : "Publier la question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;