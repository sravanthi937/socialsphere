import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import PostCard from "../components/PostCard";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get(`/users/${id}`).then((res) => setUser(res.data));
    api.get(`/posts/user/${id}`).then((res) => setPosts(res.data));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <p className="text-gray-600 mb-4">{user.email}</p>
      <h3 className="font-semibold text-lg mb-2">Posts</h3>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
