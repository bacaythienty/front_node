import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Laconnexion = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const data = { email, password };

    try {
      const response = await fetch(
        `${API_URL}/api/auth/connexion`,
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
        localStorage.setItem("token", result.token);

        if (result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
        }

        alert(`Connexion réussie ${result.user.prenom} ${result.user.nom}`);

        navigate("/");
      } else {
        alert(result.message || "Identifiants incorrects");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur serveur. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        
       

        {/* Titre */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Connexion
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Connectez-vous à votre compte
        </p>

        <form onSubmit={Laconnexion}>
          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Adresse email
            </label>

            <input
              type="email"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
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
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-300 shadow-md"
          >
            Se connecter
          </button>

          {/* Lien inscription */}
          <p className="text-center mt-6 text-gray-600">
            Vous n'avez pas de compte ?
            <Link
              to="/inscription"
              className="ml-2 text-green-600 font-semibold hover:underline"
            >
              S'inscrire
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Connexion;