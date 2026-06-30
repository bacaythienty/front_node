import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


const EditeQuestion = () => {


  const { id } = useParams();

  const navigate = useNavigate();


  const API_URL = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");



  const [formData, setFormData] = useState({

    title:"",
    description:"",
    tags:"",

  });





  useEffect(()=>{


    axios.get(
      `${API_URL}/api/questions/${id}`
    )

    .then(res=>{


      setFormData({

        title:res.data.title || "",

        description:res.data.description || "",

        tags:res.data.tags?.join(", ") || "",

      });


    })

    .catch(err=>{

      console.log(err);

    });



  },[id]);







  const handleChange=(e)=>{


    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });


  };







  const handleSubmit = async(e)=>{


    e.preventDefault();



    if(!token){

      toast.error(
        "Veuillez vous connecter"
      );

      return;

    }




    try{


      await axios.put(

        `${API_URL}/api/questions/${id}`,

        {

          title:formData.title,

          description:formData.description,

          tags:formData.tags
            .split(",")
            .map(tag=>tag.trim())
            .filter(tag=>tag !== "")

        },

        {

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );



      toast.success(
        "Question modifiée avec succès"
      );


      navigate(`/question/${id}`);



    }catch(error){


      console.log(error);


      toast.error(

        error.response?.data?.message ||

        "Erreur lors de la modification"

      );


    }


  };






  return (

    <div className="
      max-w-4xl
      mx-auto
      px-4
      py-6
      md:py-10
    ">




      <h1 className="
        text-2xl
        md:text-3xl
        font-bold
        mb-5
        md:mb-6
      ">

        Modifier la question

      </h1>







      <form

        onSubmit={handleSubmit}

        className="
          space-y-5
          bg-white
          p-5
          md:p-8
          rounded-xl
          shadow
        "

      >




        {/* TITRE */}

        <div>


          <label className="
            block
            mb-2
            font-semibold
          ">

            Titre

          </label>



          <input

            type="text"

            name="title"

            value={formData.title}

            onChange={handleChange}

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

            required

          />


        </div>







        {/* DESCRIPTION */}


        <div>


          <label className="
            block
            mb-2
            font-semibold
          ">

            Description

          </label>





          <textarea

            name="description"

            value={formData.description}

            onChange={handleChange}

            rows="6"

            className="
              w-full
              border
              rounded-lg
              p-3
              resize-none
              text-sm
              md:text-base
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "

            required

          />



        </div>








        {/* TAGS */}



        <div>


          <label className="
            block
            mb-2
            font-semibold
          ">

            Tags

          </label>





          <input

            type="text"

            name="tags"

            value={formData.tags}

            onChange={handleChange}

            className="
              w-full
              border
              rounded-lg
              p-3
              text-sm
              md:text-base
            "

          />


        </div>







        <button

          type="submit"

          className="
            w-full
            sm:w-auto
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-lg
            font-semibold
          "

        >

          Enregistrer les modifications

        </button>





      </form>



    </div>

  );

};



export default EditeQuestion;