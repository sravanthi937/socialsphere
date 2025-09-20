import { useState, useEffect } from "react";
import api from "../api/api";
import PostCard from "../components/PostCard";
import PostEditor from "../components/PostEditor";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts").then((res) => setPosts(res.data));
  }, []);

  const addPost = (post) => setPosts([post, ...posts]);

  return (
    <div>
      <PostEditor onPostCreated={addPost} />
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
