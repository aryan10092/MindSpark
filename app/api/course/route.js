import db from "@/configs/db"
import { STUDY_TABLE } from "@/configs/schema"
import { desc, eq } from "drizzle-orm"
import { Search } from "lucide-react"
import { NextResponse } from "next/server"
// import { URL } from "uuid/dist/cjs/v35"


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


// export async function GET(req) {
//     const url = req.url;
//     const searchParams = new URL(url).searchParams; // Correct way to get search params
//     const courseId = searchParams.get('courseId');
  
//     if (!courseId) {
//       return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
//     }
  
//     try {
//       const course = await db
//         .select()
//         .from(STUDY_TABLE)
//         .where(eq(STUDY_TABLE.courseId, courseId));
  
//       return NextResponse.json({ result: course });
//     } catch (error) {
//       return NextResponse.json(
//         { error: 'Database query failed', details: error.message },
//         { status: 500 }
//       );
//     }
//   }


  //a0d91f32-830e-464b-87a9-07f1ff885ac0