
import React from "react";
import { Button } from "@heroui/react";

export default function DropDownPost({ onEdit, onDelete }) {
  return (
    <div className="flex gap-3">
      <Button
        onClick={onEdit}
        className="bg-gradient-to-r from-pink-600 to-sky-600 text-white 
        font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
      >
        Edit
      </Button>
      <Button
        onClick={onDelete}
        className="bg-gradient-to-r from-pink-600 to-sky-600 text-white
         font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
      >
        Delete
      </Button>
    </div>
  );
}
