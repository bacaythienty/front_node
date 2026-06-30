import React from "react";
import Connexion from "./app/pages/Connexion";
import Inscription from "./app/pages/Inscription";
import UserLayout from "./app/layout/UserLayout";
import Accueil from "./app/pages/Accueil";
import EditProfil from "./app/pages/EditProfil";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Profil from "./app/pages/Profil";
import Detail from "./app/pages/Detail";
import QuestionForm from "./app/pages/QuestionForm";
import EditeQuestion from "./app/pages/EditeQuestion";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {


  const router = createBrowserRouter([

    {
      path: "/",
      element: <UserLayout />,

   children: [

  {
    path: "/",
    element: <Accueil />
  },

  {
    path: "connexion",
    element: <Connexion />
  },

  {
    path: "inscription",
    element: <Inscription />
  },

  {
    path: "profil",
    element: <Profil />
  },

  {
    path: "ajouter_question",
    element: <QuestionForm />
  },

  {
    path: "detail/:id",
    element: <Detail />
  },

  {
    path: "modifier_question/:id", 
    element: <EditeQuestion />
  },
  {
  path: "modifier_profil",
  element: <EditProfil />
  }

]
    },


  ]);


  return (

    <>

      <RouterProvider router={router} />


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />

    </>

  );
};


export default App;