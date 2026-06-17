import React from "react";
import { Link } from "react-router-dom";

const QuestionCard = ({ question }) => {
  return (
    <Link to={`/question/${question._id}`}>
      <div className="border rounded-lg p-4 shadow hover:shadow-lg">

        <h2 className="text-xl font-semibold text-blue-600">
          {question.title}
        </h2>

        <p className="text-gray-600 mt-2">
          {question.description}
        </p>

        <div className="flex justify-between mt-4">
          <span>
            {question.author?.prenom} {question.author?.nom}
          </span>

          <span>
            {new Date(question.createdAt).toLocaleDateString()}
          </span>
        </div>

      </div>
    </Link>
  );
};

export default QuestionCard;