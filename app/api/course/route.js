import db from "@/configs/db"
import { STUDY_TABLE } from "@/configs/schema"
import { desc, eq } from "drizzle-orm"
import { Search } from "lucide-react"
import { NextResponse } from "next/server"



export async function POST(req) {
    
const{createdemail}=await req.json()

const result=await db.select().from(STUDY_TABLE).
where(eq(STUDY_TABLE.createdby,createdemail)).orderBy(
    desc(STUDY_TABLE.id)
)

return NextResponse.json({result:result})

}

export async function GET(req){

const url=req.url
const SearchParams = new URL(url).searchParams

const courseId=SearchParams.get('courseId')

const course= await db.select().from(STUDY_TABLE)
.where(eq(STUDY_TABLE.courseId,courseId))

return NextResponse.json({result:course[0]})

}


