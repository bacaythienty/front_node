import React, { useEffect, useState } from "react";
import axios from "axios";
import Commentaires from "../../composants/Commentaires";
import { toast } from "react-toastify";
import ReponseForm from "../../composants/ReponseForm";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";


const Detail = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [votes, setVotes] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    getQuestion();
  }, [id]);


  const getQuestion = async () => {
    try {

      const res = await axios.get(
        `${API_URL}/api/questions/${id}`
      );

      setQuestion(res.data);
      setVotes(res.data.votes || 0);

    } catch(error){
      console.log(error);
    }
  };


  const handleVote = async () => {

    const token = localStorage.getItem("token");

    if(!token){
      toast.error("Connectez-vous pour voter");
      return;
    }


    try {

      await axios.post(
        `${API_URL}/api/questions/${id}/upvote`,
        {},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      getQuestion();


    }catch(error){

      toast.error(
        error.response?.data?.message ||
        "Erreur lors du vote"
      );

    }

  };



  const supprimerQuestion = async()=>{

    const token = localStorage.getItem("token");

    if(!token){
      toast.error("Connectez-vous");
      return;
    }


    if(!window.confirm(
      "Voulez-vous vraiment supprimer cette question ?"
    )) return;


    try{

      await axios.delete(
        `${API_URL}/api/questions/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      toast.success(
        "Question supprimée avec succès"
      );

      navigate("/");


    }catch(error){

      toast.error(
        error.response?.data?.message ||
        "Erreur suppression"
      );

    }

  };



  if(!question){

    return (
      <div className="
        text-center
        mt-10
        text-lg
      ">
        Chargement...
      </div>
    );

  }



  return (

    <div className="
      max-w-5xl
      mx-auto
      px-4
      py-6
      md:px-8
    ">


      {/* TITRE */}

      <h1 className="
        text-2xl
        md:text-4xl
        font-bold
        mb-4
        break-words
      ">

        {question.title}

      </h1>



      {/* AUTEUR */}

      <div className="
        flex
        flex-col
        sm:flex-row
        gap-3
        sm:gap-6
        text-gray-500
        mb-6
      ">

        <span>
          👤 {question.author?.prenom}{" "}
          {question.author?.nom}
        </span>


        <span>
          📅{" "}
          {new Date(
            question.createdAt
          ).toLocaleDateString()}
        </span>

      </div>




      {/* DESCRIPTION */}

      <div className="
        bg-white
        shadow
        rounded-xl
        p-4
        md:p-6
      ">

        <p className="
          text-gray-700
          leading-relaxed
          text-sm
          md:text-base
        ">

          {question.description}

        </p>

      </div>




      {/* TAGS */}

      <div className="
        flex
        flex-wrap
        gap-2
        mt-5
      ">


        {question.tags?.map(
          (tag,index)=>(

          <span
            key={index}
            className="
              bg-blue-100
              text-blue-700
              px-3
              py-1
              rounded-full
              text-sm
            "
          >

            #{tag}

          </span>

        ))}

      </div>




      {/* VOTE */}

      <div className="mt-6">

        <button

          onClick={handleVote}

          className="
            w-full
            sm:w-auto
            bg-green-500
            hover:bg-green-600
            text-white
            px-5
            py-2
            rounded-lg
          "

        >

          👍 {votes} vote{votes > 1 ? "s":""}

        </button>


      </div>




      {/* ACTIONS */}

      <div className="
        flex
        flex-col
        sm:flex-row
        gap-3
        mt-5
      ">


        <Link

          to={`/modifier_question/${question._id}`}

          className="
            text-center
            bg-yellow-500
            hover:bg-yellow-600
            text-white
            px-4
            py-2
            rounded-lg
          "

        >

          Modifier

        </Link>



        <button

          onClick={supprimerQuestion}

          className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-4
            py-2
            rounded-lg
          "

        >

          Supprimer

        </button>


      </div>





      {/* COMMENTAIRES */}

      <div className="mt-10">


        <h2 className="
          text-xl
          md:text-2xl
          font-bold
          mb-4
        ">

          Commentaires

        </h2>


        <Commentaires questionId={id}/>


      </div>




      {/* REPONSE */}

      <div className="mt-10">


        <h2 className="
          text-xl
          md:text-2xl
          font-bold
          mb-4
        ">

          Répondre à la question

        </h2>


        <ReponseForm questionId={id}/>


      </div>



    </div>

  );

};


export default Detail;