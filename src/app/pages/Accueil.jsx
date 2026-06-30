import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Questions from "../../composants/Questions";

const Accueil = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const VerificationToken = () => {
    if (token) {
      navigate("/ajouter_question");
    } else {
      navigate("/connexion");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              Bienvenue sur Mini<span className="text-orange-500">StackOverflow</span>
            </h1>
            <p className="mt-3 text-lg text-green-100">
              Posez vos questions et aidez la communauté.
            </p>
          </div>

         
        </div>
      </div>

      {/* Liste des questions */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Questions récentes
            </h2>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Communauté
            </span>
          </div>

          <Questions />
        </div>
      </div>
    </div>
  );
};

export default Accueil;