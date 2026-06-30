import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [menuOpen, setMenuOpen] = useState(false);

  const Deconnexion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Déconnexion réussie");

    navigate("/");
  };

  return (
    <nav className="bg-slate-900 shadow-lg">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}

          <NavLink
            to="/"
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold">
              S
            </div>

            <span className="text-white text-xl font-bold">
              Mini
              <span className="text-orange-500">
                StackOverflow
              </span>
            </span>

          </NavLink>

          {/* Desktop */}

          <div className="hidden md:flex items-center gap-6">

            <NavLink
              to="/"
              className="text-gray-300 hover:text-orange-500"
            >
              Accueil
            </NavLink>

            {token && (
              <NavLink to="/profil">

                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                  {user?.prenom?.charAt(0)}
                </div>

              </NavLink>
            )}

            {token ? (

              <button
                onClick={Deconnexion}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Déconnexion
              </button>

            ) : (

              <>
                <NavLink
                  to="/connexion"
                  className="text-orange-500 border border-orange-500 px-4 py-2 rounded-lg"
                >
                  Connexion
                </NavLink>

                <NavLink
                  to="/inscription"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                >
                  Inscription
                </NavLink>
              </>

            )}

          </div>

          {/* Bouton mobile */}

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>

        </div>

      </div>

      {/* Menu Mobile */}

      {menuOpen && (

        <div className="md:hidden bg-slate-800 px-4 py-4 space-y-4">

          <NavLink
            to="/"
            className="block text-white"
            onClick={() => setMenuOpen(false)}
          >
            Accueil
          </NavLink>

          {token && (

            <NavLink
              to="/profil"
              className="block text-white"
              onClick={() => setMenuOpen(false)}
            >
              Mon Profil
            </NavLink>

          )}

          {token ? (

            <button
              onClick={() => {
                Deconnexion();
                setMenuOpen(false);
              }}
              className="w-full bg-red-500 text-white py-2 rounded-lg"
            >
              Déconnexion
            </button>

          ) : (

            <>
              <NavLink
                to="/connexion"
                onClick={() => setMenuOpen(false)}
                className="block text-center border border-orange-500 text-orange-500 py-2 rounded-lg"
              >
                Connexion
              </NavLink>

              <NavLink
                to="/inscription"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-orange-500 text-white py-2 rounded-lg"
              >
                Inscription
              </NavLink>
            </>

          )}

        </div>

      )}

    </nav>
  );
};

export default Navbar;