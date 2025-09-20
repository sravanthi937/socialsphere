import { useState } from "react";
import api from "../api/api";

export default function PostEditor({ onPostCreated }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/posts", { content });
    onPostCreated(res.data);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-4">
      <textarea
        placeholder="What's on your mind?"
        className="border p-2 w-full mb-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Post
      </button>
    </form>
  );
}
