"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

import { MessageCircle } from "lucide-react";

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
          name: user.firstName,
        cooment: newComment,
      });

      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error(" error adding comment", error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      
      <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 
          flex items-center justify-center">
        
          <MessageCircle className="w-6 h-6 text-orange-400" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
          Community Comments
     </h2>   
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
        <div className="space-y-4 mb-6">
          {comments.length > 0 ? (
         comments.map((comment) => (
              <div key={comment.id} className="bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
                  
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 
                 flex items-center justify-center text-white font-semibold">
                    
               {(comment.name || "Guest").charAt(0)}
                  </div>
                  <span className="font-medium text-slate-700">
                    {comment.name || "Guest"}</span>
                </div>
                <p className="text-slate-600 ml-10">
                  {comment.cooment}</p>
              </div>
            ))
          ) : 
            (
            <div className="text-center py-8 text-slate-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>

        {user ? (
          <div className="space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-4 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-300 
              focus:border-orange-300 outline-none transition-all resize-none min-h-[100px]"
            />
            <button
              onClick={handleAddComment}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 
              text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/20"
            >
              Post Comment
            </button>
          </div>
        ) : 
          (
          <div className="text-center py-6 bg-orange-50 rounded-xl border border-orange-100">
            <p className="text-orange-600 font-medium">
              Please login to join the conversation</p>
          </div>
        )}
   </div>
    </div>
  );
}

export default Comments;

