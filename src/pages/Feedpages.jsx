
import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { getAllPosts } from "../services/PostServices";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router-dom";

export default function Feedpages() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  async function getAllPostsApi() {
    const response = await getAllPosts();
    setPosts(response.posts || []);
  }

  useEffect(() => {
    getAllPostsApi();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Container */}
      <div className="w-full md:w-4/6 mx-auto pb-28 px-3 space-y-6">
        {posts.length === 0 ? (
          <LoadingScreen />
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              commentLimit={1}
              callback={getAllPostsApi}
              post={post}
            />
          ))
        )}
      </div>

      {/* Floating Add Post Button */}
      <button
        onClick={() => navigate("/addpost")}
        className="fixed cursor-pointer bottom-6 right-6 bg-gradient-to-r from-pink-600 to-sky-600 text-white rounded-full
         w-14 h-14 flex items-center justify-center text-3xl shadow-lg hover:shadow-xl transition-all duration-200 z-50"
      >
        +
      </button>
    </div>
  );
}
