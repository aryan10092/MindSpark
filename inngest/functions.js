import db from "../configs/db";
import { inngest } from "./client";
import USER_TABLE, { CHAPTER_NOTES, STUDY_TABLE } from "../configs/schema";
import { eq } from "drizzle-orm";
import { generatenotesai } from "@/configs/openaimodel";



// helloWorld function: Simple async example
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

// createuser function: Check for new user or create db entry
export const createuser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;

    // Run DB check and insert in parallel to avoid blocking
    const result = await step.run("check new user or create db", async () => {
      const result = await db.select().from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

      console.log(result);

      if (result?.length == 0) {
        const res = await db.insert(USER_TABLE).values({
          name: user?.username,
          email: user?.primaryEmailAddress?.emailAddress,
        }).returning({ id: USER_TABLE.id });

        return res;
      }
      return result;
    });

    return "success";
  }
);

// generatenotes function: Generate notes for each chapter in the course
export const generatenotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "generate.notes" },
  async ({ event, step }) => {
    const { course } = event.data;

    const chapters = course?.courselayout?.chapters || course?.courselayout?.Chapters;
    console.log(chapters);

    if (!chapters || chapters.length === 0) {
      throw new Error("No chapters found in the course layout.");
    }

    // Run chapter note generation in parallel for better performance
    await step.run("generate chapter notes", async () => {
      await Promise.all(
        chapters.map(async (chapter, index) => {
          try {
           // const PROMPT = `generate exam material detail content for each chapter, make sure to include all topic points in the content, make sure to give content in HTML format (do not add HTML, head, body, title tags), the chapters: ${JSON.stringify(chapter)}`;
            const PROMPT= `
            Generate detailed exam material for each chapter listed below. Ensure the content includes all topic points with clear explanations.  
            Provide the content in properly formatted HTML using:
            - <h2> for chapter titles
            - <h3> for topic titles
            - <p> for explanations
            - <ul> or <ol> for listing key points
           
            
            Do not include <html>, <head>, <body>, or <title> tags.style the text properly
            Use the following chapters: ${JSON.stringify(chapter)}
            `

            
            const res = await generatenotesai(PROMPT);
            const airesp = await res.response.text();
            console.log(airesp);

            await db.insert(CHAPTER_NOTES).values({
              courseId: course?.courseId,
              chapterId: index,
              notes: airesp,
            });
          } catch (error) {
            console.error(`Error processing chapter ${index}:`, error);
          }
        })
      );
      return "done";
    });

    // Step 2: Update Course Status in the DB
    await step.run("update course status", async () => {
      await db.update(STUDY_TABLE).set({ status: "Ready" })
        .where(eq(STUDY_TABLE.courseId, course?.courseId));

      return "success";
    });

    return "Notes generation complete!";
  }
);
