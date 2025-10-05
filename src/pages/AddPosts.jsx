
import React, { useState } from "react";
import { Button, Spinner, Textarea } from "@heroui/react";
import { createPostApi } from "../services/PostServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddPosts({ callback }) {
  const [postBody, setPostBody] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function createPost(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("body", postBody);
    formData.append("image", image);

    try {
      const response = await createPostApi(formData);

      if (response.message === "success") {
        toast.success("Post added successfully");
        await callback();
        setPostBody("");
        setImageUrl("");
        navigate("/");
      } else {
        toast.error("Failed to add post");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  }

  function handleImage(e) {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    e.target.value = "";
  }

  return (
    <div className="flex justify-center py-12 px-4">
      {/* Modern Card */}
      <div className="w-full max-w-2xl rounded-3xl bg-pink-500/20 backdrop-blur-lg border border-pink-400/40 shadow-xl p-10 flex flex-col gap-6">
        <h2 className="text-3xl font-extrabold text-pink-900 text-center drop-shadow-md">
          Create New Post 
        </h2>

        <form onSubmit={createPost} className="flex flex-col gap-6 relative">
          {/* Textarea */}
          <div>
            <label className="block mb-2 font-semibold text-pink-900/90">
              What's on your mind?
            </label>
            <Textarea
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              placeholder="Write something amazing..."
              minRows={4}
              className="w-full p-4 rounded-xl bg-white/80 text-gray-900 border border-pink-300 shadow-md focus:ring-2 focus:ring-pink-400 transition"
            />
          </div>

          {/* Image Preview */}
          {imageUrl && (
            <div className="relative group">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full object-cover rounded-xl border border-pink-300 shadow-md"
              />
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow-md opacity-80 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          )}

          {/* Image Upload */}
          <label className="cursor-pointer flex items-center gap-3 text-pink-900 font-medium hover:text-pink-800 transition">
            <input
              type="file"
              className="hidden"
              onChange={handleImage}
              accept="image/*"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 15.75L9.75 9l6.75 6.75M3 21h18v-18H3v18z"
              />
            </svg>
            <span>Upload Image</span>
          </label>

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-4 px-40 py-4 rounded-full bg-gradient-to-r from-pink-600 to-sky-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 self-center"
          >
            {loading ? <Spinner color="white" size="sm" /> : "Add Post"}
          </Button>

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white/30 rounded-3xl">
              <Spinner size="lg" color="white" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
