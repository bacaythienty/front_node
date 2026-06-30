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
      toast.error("Connectez-vous pour répondre");
      return;
    }


    try {

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


      toast.success("Réponse ajoutée");

      setContenu("");

    } catch(error){

      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
        "Erreur création réponse"
      );

    }

  };


  return (
    <form onSubmit={envoyer} className="mt-5">


      <textarea
        className="border rounded w-full p-3"
        placeholder="Écrire une réponse..."
        value={contenu}
        onChange={(e)=>setContenu(e.target.value)}
      />


      <button
        className="mt-3 bg-blue-600 text-white px-5 py-2 rounded"
      >
        Envoyer
      </button>


    </form>
  )
}


export default ReponseForm;