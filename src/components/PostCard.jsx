
import React, { useContext, useState } from "react";
import PostHeader from "./Card/PostHeader";
import PostBody from "./Card/PostBody";
import PostFooter from "./Card/PostFooter";
import { Button, Textarea } from "@heroui/react";
import { createCimmentApi, getPostCommentApi } from "../services/CommentServices";
import { AuthContext } from "../Context/AuthContext";
import { deletePostApi, updatePostApi } from "../services/PostServices";
import DropDownPost from "./DropDownPosts";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";

export default function PostCard({ post, commentLimit, callback }) {
  const { userData } = useContext(AuthContext);

  const [commentContent, setCommentContent] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [comments, setComments] = useState(post.comments || []);

  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(post.body);
  const [editImage, setEditImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(post.image);
  const [editLoading, setEditLoading] = useState(false);

  async function createComment(e) {
    e.preventDefault();
    setIsloading(true);
    const response = await createCimmentApi(commentContent, post.id);
    if (response.message === "success") {
      await getPostComments();
      setCommentContent("");
    }
    setIsloading(false);
  }

  async function getPostComments() {
    const response = await getPostCommentApi(post.id);
    if (response.message === "success") {
      setComments(response.comments);
    }
  }

  async function handleDelete() {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8a2239ff",
      cancelButtonColor: "#ad76b8ff",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await deletePostApi(post.id);
        if (response.message === "success") {
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
          await callback();
        } else {
          Swal.fire("Error!", "Failed to delete post.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  }

  async function saveEdit() {
    setEditLoading(true);
    const formData = new FormData();
    formData.append("body", editBody);
    if (editImage) formData.append("image", editImage);

    const response = await updatePostApi(post.id, formData);
    if (response.message === "success") {
      toast.success("Post updated successfully");
      setIsEditing(false);
      await callback();
    } else {
      toast.error("Failed to update post");
    }
    setEditLoading(false);
  }

  return (
    <div
      className="w-full max-w-5xl mx-auto bg-pink-300 text-gray-900
                 shadow-md p-6 mb-6 rounded-xl
                 transition-all hover:shadow-lg hover:scale-[1.01] duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <PostHeader
          photo={post.user.photo}
          name={post.user.name}
          data={post.createdAt}
        />

        {userData._id === post.user._id && (
          <DropDownPost
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Body / Edit Mode */}
      {isEditing ? (
        <div className="space-y-4">
          <Textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            minRows={3}
            className="rounded-lg border border-pink-300 bg-white text-gray-800 shadow-sm"
          />

          {previewImage && (
            <div className="relative">
              <img
                src={previewImage}
                className="rounded-lg shadow-md border border-pink-200"
                alt="Preview"
              />
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null);
                  setEditImage(null);
                }}
                className="absolute top-2 right-2 bg-white/90 rounded-full p-2 shadow hover:bg-gray-100"
              >
                <HiXCircle size={20} className="text-red-500" />
              </button>
            </div>
          )}

          <input
            type="file"
            onChange={(e) => {
              setEditImage(e.target.files[0]);
              setPreviewImage(URL.createObjectURL(e.target.files[0]));
            }}
            className="text-sm text-gray-600"
          />

          <div className="flex gap-3">
            <Button
              onClick={saveEdit}
              isLoading={editLoading}
              color="primary"
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md shadow"
            >
              <HiCheckCircle size={18} /> Save
            </Button>
            <Button
              variant="flat"
              color="danger"
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md shadow"
            >
              <HiXCircle size={18} /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        <PostBody body={post.body} image={post.image} />
      )}

      {/* Footer */}
      <PostFooter postId={post.id} commentNumber={comments.length} />
    </div>
  );
}
