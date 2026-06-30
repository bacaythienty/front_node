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
    <Link to={`/detail/${question._id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 p-5 mb-4">

        {/* Titre */}
        <h2 className="text-xl font-bold text-blue-600 hover:text-blue-700">
          {question.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mt-3 line-clamp-3">
          {question.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {question.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Auteur */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
              {question.author?.prenom?.charAt(0) || "U"}
            </div>

            <div>
              <p className="font-semibold">
                {question.author?.prenom} {question.author?.nom}
              </p>

              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar size={15} />
                {new Date(question.createdAt).toLocaleDateString()}
              </p>
            </div>

          </div>

          {/* Statistiques */}

          <div className="flex flex-wrap gap-5">

            <div className="flex items-center gap-1 text-green-600">
              <ThumbsUp size={18} />
              <span className="font-semibold">
                {question.votes || 0}
              </span>
              <span className="text-gray-500">
                votes
              </span>
            </div>

            <div className="flex items-center gap-1 text-blue-600">
              <MessageCircle size={18} />
              <span className="font-semibold">
                {question.commentairesCount || 0}
              </span>
              <span className="text-gray-500">
                commentaires
              </span>
            </div>

          </div>

        </div>

      </div>
    </Link>
  );
};

export default QuestionCard;