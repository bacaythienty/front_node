import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const Deconnexion = () => {
    localStorage.removeItem("token");
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  return (
    <nav className="w-full h-20 bg-slate-900 shadow-lg px-10 flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold text-xl">
          S
        </div>

        <NavLink
          to="/"
          className="text-2xl font-extrabold text-white"
        >
          Mini<span className="text-orange-500">StackOverflow</span>
        </NavLink>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium transition ${
              isActive
                ? "text-orange-500"
                : "text-gray-300 hover:text-orange-500"
            }`
          }
        >
          Accueil
        </NavLink>

        {token && (
  <NavLink
    to="/profil"
    className="flex items-center gap-3 hover:bg-slate-800 px-3 py-2 rounded-lg transition"
  >
    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
      {user?.prenom?.charAt(0)}
    </div>


  </NavLink>
)}

        {token ? (
          <button
            onClick={Deconnexion}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
          >
            Déconnexion
          </button>
        ) : (
          <div className="flex items-center gap-3">

            <NavLink
              to="/connexion"
              className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              Connexion
            </NavLink>

            <NavLink
              to="/inscription"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
            >
              Inscription
            </NavLink>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;