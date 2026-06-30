import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const QuestionForm = () => {

  const Questions_API_URL = import.meta.env.VITE_QUESTION_API_URL;


  const [formData, setFormData] = useState({
    title:"",
    description:"",
    tags:"",
  });


  const [loading,setLoading] = useState(false);



  const handleChange = (e)=>{

    setFormData(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }));

  };



  const handleReset = ()=>{

    setFormData({
      title:"",
      description:"",
      tags:"",
    });

  };




  const handleSubmit = async(e)=>{

    e.preventDefault();


    const token = localStorage.getItem("token");



    if(!token){

      toast.error(
        "Veuillez vous connecter avant de publier une question."
      );

      return;

    }



    if(!formData.title.trim()){

      toast.error(
        "Le titre est obligatoire"
      );

      return;

    }




    if(!formData.description.trim()){

      toast.error(
        "La description est obligatoire"
      );

      return;

    }





    try{


      setLoading(true);



      const questionData = {

        title:formData.title.trim(),

        description:formData.description.trim(),

        tags:formData.tags
          .split(",")
          .map(tag=>tag.trim())
          .filter(tag=>tag !== "")

      };




      await axios.post(

        Questions_API_URL,

        questionData,

        {

          headers:{

            Authorization:`Bearer ${token}`,

            "Content-Type":"application/json"

          }

        }

      );



      toast.success(
        "Question publiée avec succès ✅"
      );

      handleReset();



    }catch(error){


      console.error(error);


      toast.error(

        error.response?.data?.message ||

        "Erreur lors de la publication"

      );



    }finally{

      setLoading(false);

    }


  };





  return (

    <div className="
      min-h-screen
      bg-gray-100
      py-6
      md:py-10
      px-4
    ">



      <div className="
        max-w-4xl
        mx-auto
        bg-white
        shadow-lg
        rounded-xl
        p-5
        md:p-8
      ">




        <h1 className="
          text-2xl
          md:text-3xl
          font-bold
          text-gray-800
          mb-2
        ">

          Poser une question

        </h1>





        <p className="
          text-gray-500
          mb-6
          md:mb-8
          text-sm
          md:text-base
        ">


          Soyez précis et fournissez suffisamment de détails pour obtenir une réponse utile.


        </p>






        <form

          onSubmit={handleSubmit}

          className="
            space-y-5
            md:space-y-6
          "

        >



          {/* TITRE */}

          <div>


            <label className="
              block
              text-gray-700
              font-semibold
              mb-2
            ">

              Titre

            </label>




            <input

              type="text"

              name="title"

              value={formData.title}

              onChange={handleChange}

              placeholder="Ex: Comment utiliser useEffect dans React ?"

              className="
                w-full
                border
                border-gray-300
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
              text-gray-700
              font-semibold
              mb-2
            ">

              Description détaillée

            </label>




            <textarea

              name="description"

              value={formData.description}

              onChange={handleChange}

              rows="6"

              placeholder="Décrivez votre problème en détail..."

              className="
                w-full
                border
                border-gray-300
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
              text-gray-700
              font-semibold
              mb-2
            ">

              Tags

            </label>





            <input

              type="text"

              name="tags"

              value={formData.tags}

              onChange={handleChange}

              placeholder="react, javascript, nodejs"

              className="
                w-full
                border
                border-gray-300
                rounded-lg
                p-3
                text-sm
                md:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />



            <p className="
              text-xs
              md:text-sm
              text-gray-500
              mt-1
            ">

              Séparez les tags par une virgule.

            </p>


          </div>








          {/* BOUTONS */}


          <div className="
            flex
            flex-col
            sm:flex-row
            justify-end
            gap-3
          ">




            <button

              type="button"

              onClick={handleReset}

              className="
                w-full
                sm:w-auto
                px-6
                py-3
                border
                border-gray-300
                rounded-lg
                hover:bg-gray-100
              "

            >

              Annuler

            </button>






            <button

              type="submit"

              disabled={loading}

              className="
                w-full
                sm:w-auto
                px-6
                py-3
                bg-blue-600
                text-white
                rounded-lg
                hover:bg-blue-700
                font-semibold
                disabled:opacity-50
              "

            >

              {loading
                ? "Publication..."
                : "Publier la question"
              }


            </button>



          </div>





        </form>


      </div>


    </div>

  );

};


export default QuestionForm;