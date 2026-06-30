import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";

const EditeQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/api/questions/${id}`)
      .then((res) => {
        setFormData({
          title: res.data.title || "",
          description: res.data.description || "",
          tags: res.data.tags?.join(", ") || "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_URL}/api/questions/${id}`,
        {
          title: formData.title,
          description: formData.description,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Question modifiée avec succès");

      navigate(`/question/${id}`);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la modification"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Modifier la question
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block mb-2 font-semibold">
            Titre
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="8"
            className="w-full border rounded p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Tags
          </label>

          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default EditeQuestion;