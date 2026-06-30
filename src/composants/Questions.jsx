import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  RefreshCw,
  PlusCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import QuestionCard from "./QuestionCard";

const Questions = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tri, setTri] = useState("recent");
  const [tag, setTag] = useState("");
  const [recherche, setRecherche] = useState("");

  const fetchQuestions = async () => {
    try {
      setLoading(true);  

      const res = await axios.get( `${API_URL}/api/questions`, {
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

  const resetFiltres = () => {
    setRecherche("");
    setTag("");
    setTri("recent");

    axios
      .get(API_URL)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">

        <div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
            Toutes les questions
          </h1>

          <p className="text-gray-500 mt-2">
            {questions.length} question(s) trouvée(s)
          </p>

        </div>

        <Link
          to="/ajouter_question"
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex justify-center items-center gap-2 shadow"
        >
          <PlusCircle size={20} />
          Poser une question
        </Link>

      </div>

      {/* Recherche */}

      <div className="bg-white rounded-2xl shadow-lg p-5 mb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

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
              onChange={(e) =>
                setRecherche(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchQuestions();
                }
              }}
              className="w-full border rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
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
              placeholder="React, Node.js..."
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />

          </div>

          {/* Tri */}

          <select
            value={tri}
            onChange={(e) => setTri(e.target.value)}
            className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
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

          <div className="flex flex-col sm:flex-row gap-3">

            <button
              onClick={fetchQuestions}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg flex justify-center items-center gap-2 py-3"
            >
              <RefreshCw size={18} />
              Actualiser
            </button>

            <button
              onClick={resetFiltres}
              className="flex-1 border rounded-lg hover:bg-gray-100 py-3"
            >
              Réinitialiser
            </button>

          </div>

        </div>

      </div>

      {/* Loader */}

      {loading ? (

        <div className="flex flex-col items-center py-20">

          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>

          <p className="mt-5 text-gray-500">
            Chargement des questions...
          </p>

        </div>

      ) : questions.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

          <div className="text-6xl mb-5">
            📭
          </div>

          <h2 className="text-2xl font-bold">
            Aucune question trouvée
          </h2>

          <p className="text-gray-500 mt-3">
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