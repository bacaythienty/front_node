import React from "react";
import { useNavigate } from "react-router-dom";
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

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* Texte */}
            <div className="flex-1">

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Bienvenue sur
                <span className="text-orange-400">
                  {" "}MiniStackOverflow
                </span>
              </h1>

              <p className="mt-5 text-lg text-green-100 max-w-2xl">
                Posez vos questions techniques, partagez vos connaissances,
                obtenez des réponses de la communauté et améliorez vos compétences.
              </p>

             

            </div>

            {/* Statistiques */}
            <div className="flex-1 flex flex-col gap-6">

              
            </div>

          </div>

        </div>

      </section>

      {/* Questions */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

            <h2 className="text-2xl font-bold text-gray-800">
              Questions récentes
            </h2>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              Communauté
            </span>

          </div>

          <Questions />

        </div>

      </section>

    </div>
  );
};

export default Accueil;