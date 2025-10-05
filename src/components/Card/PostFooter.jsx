
import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageSquare, Share, ThumbsUp } from "lucide-react";

export default function PostFooter({ commentNumber, postId }) {
  return (
    <div className="w-full px-5 py-4 border-t border-gray-200">
      {/* Reaction Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-sky-500 w-6 h-6 flex items-center justify-center rounded-full shadow-md">
            <ThumbsUp size={14} className="text-white" />
          </div>
          <div className="bg-pink-500 w-6 h-6 flex items-center justify-center rounded-full shadow-md -ml-2">
            <Heart size={14} className="text-white" />
          </div>
          <p className="ml-3 text-gray-600 font-medium">20 Likes</p>
        </div>
      </div>

      {/* Buttons Row */}
      <div className="grid grid-cols-3 border-t border-gray-300 pt-3">
      

        <button className="flex flex-row justify-center items-center gap-2 text-[#475569] hover:bg-[#475569]/10 py-2 px-4 rounded-xl border border-[#cbd5e1] shadow-sm hover:shadow-md transition">
  <ThumbsUp size={18} className="text-pink-600" />
  <span className="font-semibold text-base">Like</span>
</button>


        <button className="flex flex-row justify-center items-center gap-2 text-[#475569] hover:bg-[#475569]/10 py-2 rounded-lg transition">
          <MessageSquare size={18} />
          <span className="font-semibold text-base">Add Comment</span>
        </button>

      <button className="flex flex-row justify-center items-center gap-2 text-[#475569] hover:bg-[#475569]/10 py-2 rounded-lg transition">
  <Share size={18} />
  <span className="font-semibold text-base">Share</span>
</button>
      </div>
    </div>
  );
}
