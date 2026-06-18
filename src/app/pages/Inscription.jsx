import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const Inscription = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");

  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();

    if (!prenom || !nom || !email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const data = {
      prenom,
      nom,
      email,
      password,
    };

    try {
      const response = await fetch(
        `${API_URL}/api/auth/inscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(
          "Inscription réussie ✔️ Vous pouvez maintenant vous connecter."
        );
        navigate("/connexion");
      } else {
        toast.error(result.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur serveur. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">
        
       

        {/* Titre */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Créer un compte
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Rejoignez notre communauté de développeurs
        </p>

        <form onSubmit={Register}>
          {/* Prénom & Nom */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Prénom
              </label>
              <input
                type="text"
                placeholder="Prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Nom
              </label>
              <input
                type="text"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">
              Adresse Email
            </label>

            <input
              type="email"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* Mot de passe */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-medium">
              Mot de passe
            </label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-300 shadow-lg"
          >
            Créer mon compte
          </button>

          {/* Lien Connexion */}
          <p className="text-center mt-6 text-gray-600">
            Déjà un compte ?
            <Link
              to="/connexion"
              className="ml-2 text-green-600 font-semibold hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Inscription;