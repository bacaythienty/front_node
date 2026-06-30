import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";


const Profil = () => {

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState(null);



  useEffect(() => {

    verifierConnexion();

  }, []);



  const verifierConnexion = async () => {

    const token = localStorage.getItem("token");


    if(!token){

      toast.error(
        "Veuillez vous connecter"
      );

      navigate("/connexion");

      return;

    }



    try{


      const res = await axios.get(

        `${API_URL}/api/auth/profil`,

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      setUser(res.data);



    }catch(error){

      console.log(error);

      toast.error(
        "Impossible de récupérer votre profil"
      );

      navigate("/connexion");

    }

  };




  if(!user){

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
      ">

        <h2 className="
          text-xl
          md:text-2xl
          font-bold
        ">

          Chargement...

        </h2>

      </div>

    );

  }





  return (

    <div className="
      min-h-screen
      bg-gray-100
      py-6
      md:py-10
      px-4
    ">



      <div className="
        max-w-6xl
        mx-auto
      ">




        {/* PROFIL */}

        <div className="
          bg-white
          rounded-xl
          shadow-lg
          p-5
          md:p-8
        ">



          <div className="
            flex
            flex-col
            md:flex-row
            items-center
            gap-6
          ">



            <div className="
              w-24
              h-24
              md:w-32
              md:h-32
              rounded-full
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              text-4xl
              md:text-5xl
              font-bold
              shrink-0
            ">

              {user.prenom.charAt(0)}

            </div>





            <div className="
              flex-1
              text-center
              md:text-left
            ">


              <h1 className="
                text-2xl
                md:text-3xl
                font-bold
                break-words
              ">

                {user.prenom} {user.nom}

              </h1>



              <p className="
                text-gray-600
                mt-2
                break-all
              ">

                {user.email}

              </p>



              <p className="
                text-gray-500
                mt-2
                text-sm
              ">


                Membre depuis :

                {" "}

                {new Date(
                  user.createdAt
                ).toLocaleDateString()}


              </p>


            </div>





            <Link

              to="/modifier_profil"

              className="
                w-full
                md:w-auto
                text-center
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-2
                rounded-lg
              "

            >

              Modifier le profil

            </Link>



          </div>


        </div>







        {/* STATISTIQUES */}


        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
          mt-6
          md:mt-8
        ">


          {[
            {
              value:user.questions,
              label:"Questions",
              color:"text-blue-600"
            },
            {
              value:user.reponses,
              label:"Réponses",
              color:"text-green-600"
            },
            {
              value:user.commentaires,
              label:"Commentaires",
              color:"text-purple-600"
            },
            {
              value:user.reputation,
              label:"Réputation",
              color:"text-orange-600"
            }

          ].map((stat,index)=>(


            <div
              key={index}
              className="
                bg-white
                rounded-xl
                shadow
                p-6
                text-center
              "
            >

              <h2 className={`
                text-3xl
                md:text-4xl
                font-bold
                ${stat.color}
              `}>

                {stat.value}

              </h2>


              <p className="
                mt-2
                text-gray-600
              ">

                {stat.label}

              </p>


            </div>


          ))}


        </div>







        {/* INFORMATIONS */}


        <div className="
          bg-white
          rounded-xl
          shadow-lg
          p-5
          md:p-8
          mt-6
          md:mt-8
        ">


          <h2 className="
            text-xl
            md:text-2xl
            font-bold
            mb-5
          ">

            Informations personnelles

          </h2>




          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          ">


            <div>

              <label className="font-semibold">
                Prénom
              </label>

              <p className="text-gray-700 mt-1">
                {user.prenom}
              </p>

            </div>



            <div>

              <label className="font-semibold">
                Nom
              </label>

              <p className="text-gray-700 mt-1">
                {user.nom}
              </p>

            </div>



            <div>

              <label className="font-semibold">
                Email
              </label>

              <p className="text-gray-700 mt-1 break-all">
                {user.email}
              </p>

            </div>



            <div>

              <label className="font-semibold">
                Date d'inscription
              </label>

              <p className="text-gray-700 mt-1">

                {new Date(
                  user.createdAt
                ).toLocaleDateString()}

              </p>

            </div>



          </div>



        </div>



      </div>


    </div>

  );

};


export default Profil;