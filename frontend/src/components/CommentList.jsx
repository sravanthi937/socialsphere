import { useEffect, useState } from "react";
import api from "../api/api";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    api.get(`/comments/${postId}`).then((res) => setComments(res.data));
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post(`/comments/${postId}`, { text });
    setComments([...comments, res.data]);
    setText("");
  };

  return (
    <div className="mt-2">
      {comments.map((c) => (
        <p key={c._id} className="text-sm border-b py-1">
          <strong>{c.user.name}: </strong>{c.text}
        </p>
      ))}
      <form onSubmit={handleSubmit} className="flex mt-2">
        <input
          type="text"
          placeholder="Write a comment..."
          className="border p-1 flex-1 mr-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-gray-200 px-3 rounded">Send</button>
      </form>
    </div>
  );
}
