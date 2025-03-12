import db from "@/configs/db";
import { STUDY_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";



export async function POST(req,res){

    const { createdemail }=await req.json()
    
  if (!createdemail) {
    return res.status(400).json({ error: 'User email is required' });
  }

    const notes =await db.select().from(STUDY_TABLE)
    .where(eq(STUDY_TABLE?.createdby,createdemail))
  
    return NextResponse.json({count:notes})
}