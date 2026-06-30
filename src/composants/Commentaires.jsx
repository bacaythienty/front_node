import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const Commentaires = ({ questionId }) => {

  const [commentaire, setCommentaire] = useState("");
  const [commentaires, setCommentaires] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;


  const fetchCommentaires = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/commentaires/${questionId}`
      );

      setCommentaires(res.data);

    } catch(error){

      console.log(error);

    }

  };


  useEffect(() => {

    fetchCommentaires();

  }, [questionId]);



  const ajouterCommentaire = async () => {

    const token = localStorage.getItem("token");


    if(!token){

      toast.error(
        "Connectez-vous pour commenter"
      );

      return;
    }



    if(!commentaire.trim()){

      toast.error(
        "Veuillez écrire un commentaire"
      );

      return;

    }



    try{


      await axios.post(

        `${API_URL}/api/commentaires/${questionId}`,

        {
          contenu: commentaire,
        },

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      setCommentaire("");

      fetchCommentaires();


      toast.success(
        "Commentaire ajouté"
      );


    }catch(error){


      console.log(
        error.response?.data
      );


      toast.error(
        "Erreur lors de l'ajout du commentaire"
      );


    }

  };



  return (

    <div className="mt-8">


      <h2 className="
        text-xl
        md:text-2xl
        font-bold
        mb-4
      ">

        Commentaires ({commentaires.length})

      </h2>




      <textarea

        value={commentaire}

        onChange={(e)=>setCommentaire(e.target.value)}

        placeholder="Ajouter un commentaire..."

        className="
          w-full
          min-h-[120px]
          border
          rounded-xl
          p-3
          text-sm
          md:text-base
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
        "

      />




      <button

        onClick={ajouterCommentaire}

        className="
          mt-3
          w-full
          sm:w-auto
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-2
          rounded-lg
        "

      >

        Commenter

      </button>





      <div className="
        mt-6
        space-y-4
      ">


        {commentaires.map((com)=>(


          <div

            key={com._id}

            className="
              border
              rounded-xl
              p-4
              bg-gray-50
              shadow-sm
            "

          >



            <p className="
              font-semibold
              text-sm
              md:text-base
              break-words
            ">

              {com.auteur?.prenom || "Utilisateur"}{" "}
              {com.auteur?.nom || ""}

            </p>



            <p className="
              mt-2
              text-gray-700
              text-sm
              md:text-base
              break-words
            ">

              {com.contenu}

            </p>




            <p className="
              text-xs
              md:text-sm
              text-gray-500
              mt-3
            ">

              {new Date(
                com.createdAt
              ).toLocaleDateString()}

            </p>



          </div>


        ))}


      </div>



    </div>

  );

};


export default Commentaires;