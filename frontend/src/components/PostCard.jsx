import { useState } from "react";
import api from "../api/api";
import CommentList from "./CommentList";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes.length);
  const [showComments, setShowComments] = useState(false);

  const toggleLike = async () => {
    await api.put(`/posts/${post._id}/like`);
    setLikes((prev) => prev + (post.likes.includes("me") ? -1 : 1)); 
  };

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <p className="mb-2">{post.content}</p>
      <button onClick={toggleLike} className="text-blue-600 mr-4">
        ❤️ {likes}
      </button>
      <button onClick={() => setShowComments(!showComments)} className="text-gray-600">
        💬 Comments
      </button>
      {showComments && <CommentList postId={post._id} />}
    </div>
  );
}
