import React from "react";
import { Link } from "react-router-dom";
import {
  ThumbsUp,
  MessageCircle,
  Calendar,
  User,
} from "lucide-react";


const QuestionCard = ({ question }) => {

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-lg">

      <Link to={`/question/${question._id}`}>

        <h2 className="text-xl font-bold text-blue-600 mb-2">
          {question.title}
        </h2>


        <p className="text-gray-600">
          {question.description}
        </p>


        <div className="flex gap-2 mt-3">

          {question.tags?.map((tag,index)=>(
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}

        </div>


        <div className="flex justify-between mt-5 text-sm text-gray-500">


          <div>
            <User size={15} className="inline"/>
            {" "}
            {question.author?.prenom || "Utilisateur"}
          </div>


          <div>
            <Calendar size={15} className="inline"/>
            {" "}
            {new Date(question.createdAt)
              .toLocaleDateString()}
          </div>



        </div>

      </Link>


      {/* Stats */}

      <div className="flex gap-5 mt-4">


       <div className="flex gap-1 items-center">
                  <ThumbsUp size={18} />
                  <b>{question.votes ?? 0}</b>
                       votes
       </div>



        <div className="flex gap-1 items-center">
          <MessageCircle size={18}/>
          <b>
            {question.commentairesCount || 0}
          </b>
          commentaires
        </div>


      </div>


    </div>
  );
};


export default QuestionCard;