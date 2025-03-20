
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs"; 
import { currentUser } from "@clerk/nextjs";
import db from "@/configs/db";
import { COOMENTS } from "@/configs/schema";

export async function GET() {
    try {
      const allComments = await db.select().from(COOMENTS);
      return NextResponse.json(allComments);
    } catch (error) {
      console.error("❌ Error fetching comments:", error);
      return NextResponse.json({ error: "Failed to fetch comments", details: error.message }, { status: 500 });
    }
  }
  

export async function POST(req) {
    try {
      const { userId, cooment,name } = await req.json();
      
      if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      if (!cooment?.trim()) return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });
  
      const newComment = await db.insert(COOMENTS).values({
        userId, 
        name,
        cooment, 
        date: new Date(),
      }).returning();
  
      console.log("✅ Comment added:", newComment);
      return NextResponse.json(newComment, { status: 201 });
  
    } catch (error) {
      console.error("❌ Error adding comment:", error);
      return NextResponse.json({ error: "Failed to add comment", details: error.message }, { status: 500 });
    }
  }
