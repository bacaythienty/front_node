import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Filter, RefreshCw, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import QuestionCard from "./QuestionCard";

const Questions = () => {
  const API_URL = import.meta.env.VITE_QUESTION_API_URL;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tri, setTri] = useState("recent");
  const [tag, setTag] = useState("");
  const [recherche, setRecherche] = useState("");

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL, {
        params: {
          tri,
          tag,
          recherche,
        },
      });

      setQuestions(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [tri, tag]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Toutes les questions
          </h1>

          <p className="text-gray-500 mt-2">
            {questions.length} question(s) trouvée(s)
          </p>

        </div>

        <Link
          to="/ajouter_question"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Poser une question
        </Link>

      </div>

      {/* Barre de recherche */}

      <div className="bg-white rounded-xl shadow-md p-5 mb-8">

        <div className="grid lg:grid-cols-4 gap-4">

          {/* Recherche */}

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Rechercher une question..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-4 py-2"
            />

          </div>

          {/* Tag */}

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Tag (React, Node...)"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-4 py-2"
            />

          </div>

          {/* Tri */}

          <select
            value={tri}
            onChange={(e) => setTri(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="recent">
              Plus récentes
            </option>

            <option value="ancien">
              Plus anciennes
            </option>

            <option value="vote">
              Plus votées
            </option>

            <option value="commentaire">
              Plus commentées
            </option>
          </select>

          {/* Boutons */}

          <div className="flex gap-3">

            <button
              onClick={fetchQuestions}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg flex justify-center items-center gap-2"
            >
              <RefreshCw size={18} />
              Actualiser
            </button>

            <button
              onClick={() => {
                setRecherche("");
                setTag("");
                setTri("recent");
              }}
              className="px-5 border rounded-lg hover:bg-gray-100"
            >
              Reset
            </button>

          </div>

        </div>

      </div>

      {/* Questions */}

      {loading ? (

        <div className="text-center py-16">

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>

          <p className="mt-4 text-gray-500">
            Chargement...
          </p>

        </div>

      ) : questions.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <h2 className="text-2xl font-semibold">
            Aucune question trouvée
          </h2>

          <p className="text-gray-500 mt-2">
            Essayez un autre mot-clé ou un autre tag.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
            />
          ))}

        </div>

      )}

    </div>
  );
};

export default Questions;