import db from '@/configs/db'
import { CHAPTER_NOTES } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'




export async function POST(req){

  const {courseid}=await req.json()

  const notes =await db.select().from(CHAPTER_NOTES)
  .where(eq(CHAPTER_NOTES?.courseId,courseid))

  return NextResponse.json(notes)
}
