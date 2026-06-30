import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const ReponseForm = ({ questionId }) => {


  const [contenu, setContenu] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;



  const envoyer = async (e) => {

    e.preventDefault();


    const token = localStorage.getItem("token");


    if(!token){

      toast.error(
        "Connectez-vous pour répondre"
      );

      return;

    }



    if(!contenu.trim()){

      toast.error(
        "Écrivez une réponse"
      );

      return;

    }




    try{


      await axios.post(

        `${API_URL}/api/reponses/question/${questionId}`,

        {
          contenu
        },

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      toast.success(
        "Réponse ajoutée"
      );


      setContenu("");



    }catch(error){


      console.log(
        error.response?.data
      );


      toast.error(
        error.response?.data?.message ||
        "Erreur création réponse"
      );


    }

  };




  return (

    <form

      onSubmit={envoyer}

      className="
        mt-5
        space-y-3
      "

    >



      <textarea

        className="
          w-full
          min-h-[140px]
          border
          rounded-xl
          p-3
          text-sm
          md:text-base
          resize-none
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
        "

        placeholder="Écrire une réponse..."

        value={contenu}

        onChange={(e)=>setContenu(e.target.value)}

      />




      <button

        type="submit"

        className="
          w-full
          sm:w-auto
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-2
          rounded-lg
          transition
        "

      >

        Envoyer

      </button>




    </form>

  );

};


export default ReponseForm;