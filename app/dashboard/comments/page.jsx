"use client"; 

import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs"; 

function Comments() {
  const { user } = useUser(); 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
      

  const fetchComments = async () => {
    try {
      const response = await axios.get("/api/comments");
      setComments(response.data);
    } catch (error) {
      console.error("❌ Error fetching comments:", error);
    }
  };

  
  useEffect(() => {
    fetchComments();
  }, []);

 
  const handleAddComment = async () => {
    if (!newComment.trim()) return; 
    if (!user) return alert("You must be logged in to comment!"); 

    try {
      await axios.post("/api/comments", {
        userId: user.id,
        name:user.firstName,
        cooment: newComment, 
      });

      setNewComment(""); 
      fetchComments(); 
    } catch (error) {
      console.error("❌ Error adding comment:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Global Comments</h2>
      <ul className="mb-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} className="border-b py-2">
              
              <strong>{comment.name}</strong>: {comment.cooment}
            </li>
          ))
        ) :
          (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </ul>
      {user ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border p-2 rounded"
          />
          
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      ) : 
        (
        <p className="text-red-500">Login to post a comment.</p>
      )}
      
    </div>
  );
}

export default Comments;
