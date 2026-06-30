import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Profil = () => {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState(null);

  useEffect(() => {
    verifierConnexion();
  }, []);

  const verifierConnexion = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Veuillez vous connecter");
      navigate("/connexion");
      return;
    }

    try {
      const res = await axios.get(
        `${API_URL}/api/auth/profil`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
    } catch (error) {
      console.log(error);

      toast.error("Impossible de récupérer votre profil");

      navigate("/connexion");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">
          Chargement...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Carte Profil */}

        <div className="bg-white rounded-xl shadow-lg p-8">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <div className="w-32 h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold">

              {user.prenom.charAt(0)}

            </div>

            <div className="flex-1">

              <h1 className="text-3xl font-bold">

                {user.prenom} {user.nom}

              </h1>

              <p className="text-gray-600 mt-2">

                {user.email}

              </p>

              <p className="text-gray-500 mt-2">

                Membre depuis :

                {" "}

                {new Date(user.createdAt).toLocaleDateString()}

              </p>

            </div>

            <Link
                  to="/modifier_profil"
             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
                                Modifier le profil
            </Link>

          </div>

        </div>

        {/* Statistiques */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

          <div className="bg-white rounded-xl shadow p-6 text-center">

            <h2 className="text-4xl font-bold text-blue-600">

              {user.questions}

            </h2>

            <p className="mt-2 text-gray-600">

              Questions

            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">

            <h2 className="text-4xl font-bold text-green-600">

              {user.reponses}

            </h2>

            <p className="mt-2 text-gray-600">

              Réponses

            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">

            <h2 className="text-4xl font-bold text-purple-600">

              {user.commentaires}

            </h2>

            <p className="mt-2 text-gray-600">

              Commentaires

            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">

            <h2 className="text-4xl font-bold text-orange-600">

              {user.reputation}

            </h2>

            <p className="mt-2 text-gray-600">

              Réputation

            </p>

          </div>

        </div>

        {/* Informations */}

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">

            Informations personnelles

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="font-semibold">

                Prénom

              </label>

              <p className="text-gray-700 mt-1">

                {user.prenom}

              </p>

            </div>

            <div>

              <label className="font-semibold">

                Nom

              </label>

              <p className="text-gray-700 mt-1">

                {user.nom}

              </p>

            </div>

            <div>

              <label className="font-semibold">

                Email

              </label>

              <p className="text-gray-700 mt-1">

                {user.email}

              </p>

            </div>

            <div>

              <label className="font-semibold">

                Date d'inscription

              </label>

              <p className="text-gray-700 mt-1">

                {new Date(user.createdAt).toLocaleDateString()}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profil;