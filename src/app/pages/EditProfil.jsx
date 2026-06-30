import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const EditProfil = () => {


  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;



  const [prenom,setPrenom] = useState("");
  const [nom,setNom] = useState("");
  const [email,setEmail] = useState("");





  useEffect(()=>{

    chargerProfil();

  },[]);






  const chargerProfil = async()=>{


    try{


      const token = localStorage.getItem("token");



      const res = await axios.get(

        `${API_URL}/api/auth/profil`,

        {

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );



      setPrenom(res.data.prenom);

      setNom(res.data.nom);

      setEmail(res.data.email);



    }catch(error){

      console.log(error);

    }


  };







  const modifierProfil = async(e)=>{


    e.preventDefault();



    try{


      const token = localStorage.getItem("token");



      await axios.put(

        `${API_URL}/api/auth/profil`,

        {

          prenom,

          nom,

          email

        },

        {

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );



      toast.success(
        "Profil modifié avec succès"
      );


      navigate("/profil");



    }catch(error){


      console.log(error);


      toast.error(

        error.response?.data?.message ||

        "Erreur"

      );


    }


  };







  return (

    <div className="
      min-h-screen
      bg-gray-100
      flex
      justify-center
      px-4
      py-6
      md:py-10
    ">



      <div className="
        bg-white
        w-full
        max-w-xl
        rounded-xl
        shadow-lg
        p-5
        md:p-8
      ">





        <h1 className="
          text-2xl
          md:text-3xl
          font-bold
          mb-6
          md:mb-8
        ">

          Modifier mon profil

        </h1>







        <form

          onSubmit={modifierProfil}

          className="
            space-y-5
          "

        >






          <div>


            <label className="
              font-semibold
              block
              mb-2
            ">

              Prénom

            </label>



            <input

              type="text"

              value={prenom}

              onChange={(e)=>setPrenom(e.target.value)}

              className="
                w-full
                border
                rounded-lg
                p-3
                text-sm
                md:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />


          </div>







          <div>


            <label className="
              font-semibold
              block
              mb-2
            ">

              Nom

            </label>




            <input

              type="text"

              value={nom}

              onChange={(e)=>setNom(e.target.value)}

              className="
                w-full
                border
                rounded-lg
                p-3
                text-sm
                md:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />


          </div>







          <div>


            <label className="
              font-semibold
              block
              mb-2
            ">

              Email

            </label>




            <input

              type="email"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              className="
                w-full
                border
                rounded-lg
                p-3
                text-sm
                md:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />


          </div>







          <button

            type="submit"

            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-lg
              font-semibold
              transition
            "

          >

            Enregistrer les modifications


          </button>






        </form>



      </div>



    </div>

  );

};


export default EditProfil;