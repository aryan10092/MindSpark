import db from "../configs/db";
import { inngest } from "./client";
import USER_TABLE, { CHAPTER_NOTES, STUDY_TABLE } from "../configs/schema";
import { eq } from "drizzle-orm";
import { generatenotesai } from "@/configs/openaimodel";


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const createuser=inngest.createFunction(
  {id:'create-user'},
  {event:'user.create'} ,
  async({event,step})=>{
    const {user}=event.data
    const result=await step.run('check new user or create db',async()=>{

        
const result=await db.select().from(USER_TABLE)
.where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))
  

console.log(result)

if(result?.length==0){

   const res= await db.insert(USER_TABLE).values({
        name:user?.username,
        email:user?.primaryEmailAddress?.emailAddress
    }).returning({id:USER_TABLE.id})

    return res
}
return result
    })
    return 'success'
  }

)


// export const generatenotes=inngest.createFunction(

//   {id:'generate-course'},
//   {event:'generate.notes'} ,
//   async({event,step})=>{

//     const{course}=event.data;

//     const notesresult=await step.run('generate chapter notes',async()=>{

//      const chapters=course?.courselayout?.chapters
//      let index=0
//      chapters.forEach(async(x) => {
            
//       const PROMPT='generate exam material detail content for each chapter, make sure to includes all topic point in the content, make sureto give content in HTML format(do not add HTML,head ,body,title tag,),do not write html on top, the chapters:'+JSON.stringify(x)
       
//       const res=await generatenotesai(PROMPT)

//       const airesp=res.response.text()

//       await db.insert(CHAPTER_NOTES).values({

//         chapterId:index,
//         courseId:course?.courseId,
//         notes:airesp
//       })
//       index++
//      });
// return 'done'

//     })

//     const updatecoursestatus=await step.run('update course status',async()=>{
      
//       const result=await db.update(STUDY_TABLE).set({
//         status:'Ready'
//       }).where(eq(STUDY_TABLE.courseId,course?.courseId))

//       return'success'

//     })


//   }
// )



export const generatenotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "generate.notes" },
  async ({ event, step }) => {

    const { course } = event.data;


    const chapters = course?.courselayout?.chapters||course?.courselayout?.Chapters;

    console.log(chapters)

    if (!chapters || chapters.length === 0) {
      throw new Error("No chapters found in the course layout.");   }

  
    await step.run("generate chapter notes", async () => {
     
      await Promise.all(
        chapters.map(async (chapter, index) => {
          try {
            const PROMPT = 'generate exam material detail content for each chapter, make sure to includes all topic point in the content, make sure to give content in HTML format(do not add HTML,head ,body,title tag,), the chapters: ' + JSON.stringify(chapter);

              const res = await generatenotesai(PROMPT);

            const airesp = await res.response.text();
            console.log(airesp)

            await db.insert(CHAPTER_NOTES).values({

              courseId: course?.courseId,
              chapterId: index,
              
              notes: airesp
            });

          } catch (error) {
            console.error(`Error processing chapter ${index}:`, error);

      }
        } )
      );

      return "done";
    });

    // Step 2: Update Course Status
    await step.run("update course status", async () => {
      await db.update(STUDY_TABLE).set({ status: "Ready"

       }).where(eq(STUDY_TABLE.courseId, course?.courseId));
      return "success";
    });
  }
);
