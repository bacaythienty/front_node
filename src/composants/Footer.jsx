import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-auto">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Logo */}
          <div>

            <h2 className="text-2xl font-bold text-white">
              Mini
              <span className="text-orange-500">
                StackOverflow
              </span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Plateforme communautaire permettant de poser des
              questions techniques, partager des connaissances et
              apprendre ensemble.
            </p>

          </div>

          {/* Navigation */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Navigation
            </h3>

            <ul className="space-y-2">

              <li>
                <NavLink
                  to="/"
                  className="hover:text-orange-500 transition"
                >
                  Accueil
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/ajouter_question"
                  className="hover:text-orange-500 transition"
                >
                  Poser une question
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/profil"
                  className="hover:text-orange-500 transition"
                >
                  Profil
                </NavLink>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Contact
            </h3>

           

          </div>

        </div>

        {/* Bas du footer */}

        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-xs sm:text-sm text-gray-500">

          © {new Date().getFullYear()} Mini StackOverflow —
          Tous droits réservés.

        </div>

      </div>

    </footer>
  );
};

export default Footer;