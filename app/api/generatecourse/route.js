import db from "@/configs/db";
import { courseframework, generateStudyMaterial } from "@/configs/openaimodel";
import { STUDY_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {

    try{
    const {courseId,topic,studytype,level,createdBy}=await req.json()

    // const PROMPT='Generate a study material for '+topic+' for '+studytype+' and level of difficulty will be '+level+' with summary of course ,list of chapters along with summary of each chapter, topic list in each chapter,all results in json format'
    

    //  const airesponse=await courseframework.sendMessage(PROMPT)
    
    //  const airesult=JSON.parse( await airesponse.response.text())

    const airesult = await generateStudyMaterial(topic, studytype, level);

    const dbresult=await db.insert(STUDY_TABLE).values({
        courseId:courseId,
        type:studytype,
        topic:topic,
        level:level,
        courselayout:airesult,
        createdby:createdBy


    }).returning({resp:STUDY_TABLE})
 console.log(dbresult[0])

const result=await inngest.send({
    name:'generate.notes',
    data:{
        course:dbresult[0].resp
    }
})
console.log(result)
    return NextResponse.json({result:dbresult[0]})
}catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
    
}