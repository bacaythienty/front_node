import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../composants/Navbar";
import Footer from "../../composants/Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Navbar */}
      <Navbar />

      {/* Contenu */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default UserLayout;