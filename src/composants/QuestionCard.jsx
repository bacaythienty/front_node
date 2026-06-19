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
    <Link to={`/question/${question._id}`}>
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition duration-300 cursor-pointer">

        {/* Titre */}
        <h2 className="text-xl font-bold text-blue-600 mb-2 hover:text-blue-800">
          {question.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 line-clamp-3">
          {question.description}
        </p>

        {/* Tags */}
        {question.tags && question.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {question.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Informations */}
        <div className="flex flex-wrap justify-between items-center mt-5 text-sm text-gray-500 gap-3">

          {/* Auteur */}
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>
              {question.author?.prenom || "Utilisateur"}{" "}
              {question.author?.nom || ""}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>
              {new Date(question.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Votes */}
          <div className="flex items-center gap-1">
            <ThumbsUp size={16} />
            <span>{question.votes || 0} votes</span>
          </div>

          {/* Commentaires */}
          <div className="flex items-center gap-1">
            <MessageCircle size={16} />
            <span>
              {question.commentaires?.length || 0} commentaires
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;