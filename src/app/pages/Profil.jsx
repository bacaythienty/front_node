import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!token) {
      alert("Veuillez vous connecter");
      navigate("/connexion");
    }
  }, [token, navigate]);

 

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-white shadow-md rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">

            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-white text-5xl font-bold">
              {user?.prenom?.charAt(0)}
            </div>

            {/* Infos utilisateur */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold">
                {user?.prenom} {user?.nom}
              </h1>

              <p className="text-gray-600 mt-2">
                {user?.email}
              </p>

               <p className="text-gray-500 mt-1">
                Membre depuis : {user?.dateInscription}
              </p>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
              Modifier le profil
            </button>
          </div>
        </div>

        {/* Statistiques */}
        {/* <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white shadow rounded-xl p-6 text-center">
            <h2 className="text-4xl font-bold text-blue-600">
              {user?.questions}
            </h2>
            <p className="text-gray-600 mt-2">
              Questions publiées
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6 text-center">
            <h2 className="text-4xl font-bold text-green-600">
              {user?.reponses}
            </h2>
            <p className="text-gray-600 mt-2">
              Réponses données
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6 text-center">
            <h2 className="text-4xl font-bold text-orange-600">
              {user?.reputation}
            </h2>
            <p className="text-gray-600 mt-2">
              Réputation
            </p>
          </div>

        </div> */}

        {/* Activité récente */}
        {/* <div className="bg-white shadow rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Activité récente
          </h2>

          <div className="space-y-4">

            <div className="border-b pb-3">
              <p className="font-medium text-blue-600">
                Comment utiliser useEffect dans React ?
              </p>
              <span className="text-sm text-gray-500">
                Question publiée il y a 2 jours
              </span>
            </div>

            <div className="border-b pb-3">
              <p className="font-medium text-green-600">
                Réponse sur Express.js et JWT
              </p>
              <span className="text-sm text-gray-500">
                Réponse publiée il y a 5 jours
              </span> 
            </div>

          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Profil;