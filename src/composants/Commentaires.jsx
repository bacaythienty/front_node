import React, { useState } from "react";

const Commentaires = ({ questionId }) => {
  const [commentaire, setCommentaire] = useState("");

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Commentaires
      </h2>

      <textarea
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        placeholder="Ajouter un commentaire..."
        className="w-full border rounded p-3"
      />

      <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
        Commenter
      </button>
    </div>
  );
};

export default Commentaires;