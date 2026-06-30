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

      toast.error("Veuillez vous connecter");

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
        "Impossible de récupérer le profil"
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
      ">

        <h2 className="text-xl font-bold">
          Chargement...
        </h2>


      </div>

    );

  }




return (


<div className="
min-h-screen
bg-gray-100
py-8
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
p-6
">


<div className="
flex
flex-col
md:flex-row
items-center
gap-6
">





<div className="
w-28
h-28
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
text-5xl
font-bold
">


{user.prenom?.charAt(0)}


</div>





<div className="
flex-1
text-center
md:text-left
">


<h1 className="
text-3xl
font-bold
">


{user.prenom} {user.nom}


</h1>




<p className="text-gray-600 mt-2">

{user.email}

</p>




<p className="text-gray-500 mt-2">

Membre depuis :

{" "}

{
new Date(user.createdAt)
.toLocaleDateString()
}


</p>


</div>






{/* SEUL LE PROPRIETAIRE VOIT LE BOUTON */}

<Link

to="/modifier_profil"

className="
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
mt-8
">


{

[
{
value:user.questions || 0,
label:"Questions"
},
{
value:user.reponses || 0,
label:"Réponses"
},
{
value:user.commentaires || 0,
label:"Commentaires"
},
{
value:user.reputation || 0,
label:"Réputation"
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


<h2 className="
text-4xl
font-bold
text-blue-600
">

{stat.value}

</h2>



<p className="
mt-2
text-gray-600
">

{stat.label}

</p>



</div>


))


}



</div>









{/* INFORMATIONS */}


<div className="
bg-white
rounded-xl
shadow
p-6
mt-8
">


<h2 className="
text-2xl
font-bold
mb-5
">

Informations personnelles

</h2>





<div className="
grid
md:grid-cols-2
gap-5
">



<div>

<p className="font-semibold">
Prénom
</p>

<p>
{user.prenom}
</p>

</div>





<div>

<p className="font-semibold">
Nom
</p>

<p>
{user.nom}
</p>

</div>





<div>

<p className="font-semibold">
Email
</p>

<p>
{user.email}
</p>

</div>





<div>

<p className="font-semibold">
Date inscription
</p>

<p>

{
new Date(user.createdAt)
.toLocaleDateString()
}

</p>

</div>



</div>


</div>






</div>


</div>


);


};


export default Profil;