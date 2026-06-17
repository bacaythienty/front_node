import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-8">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Stack<span className="text-orange-500">Overflow</span>
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Plateforme communautaire pour poser des questions,
              partager des connaissances et apprendre ensemble.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-3">
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
            <h3 className="text-white font-semibold mb-3">
              Contact
            </h3>

            <p className="text-sm">
              📧 contact@monapp.com
            </p>

            <p className="text-sm mt-2">
              📍 Sénégal
            </p>
          </div>

        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-slate-700 mt-8 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Mon Stack Overflow Clone. Tous droits réservés.
        </div>

      </div>
    </footer>
  );
};

export default Footer;