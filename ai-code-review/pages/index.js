import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/code-review", {
        code,
      });
      setReview(response.data.review);
    } catch (error) {
      setReview("Error analyzing code.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">🚀 AI Code Review Assistant</h1>
      <textarea
        className="w-full max-w-2xl h-40 p-4 bg-gray-800 rounded-md border border-gray-700"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={handleReview}
        className="mt-4 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Review Code"}
      </button>
      {review && (
        <div className="mt-6 p-4 bg-gray-800 rounded-md w-full max-w-2xl border border-gray-700">
          <h2 className="text-lg font-bold mb-2">💡 AI Suggestions</h2>
          <p className="text-gray-300 whitespace-pre-line">{review}</p>
        </div>
      )}
    </div>
  );
}
