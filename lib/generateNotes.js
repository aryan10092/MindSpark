import db from "@/configs/db";
import { CHAPTER_NOTES, STUDY_TABLE } from "@/configs/schema";
import { generatenotesai } from "@/configs/openaimodel";
import { eq } from "drizzle-orm";

export async function generateCourseNotes(course) {
  const chapters = course?.courselayout?.chapters || course?.courselayout?.Chapters || course?.courselayout?.study_guide?.chapters || [];

  if (!chapters || chapters.length === 0) {
    throw new Error("No chapters found in the course layout.")
  }

  await Promise.all(
    chapters.map(async (chapter, index) => {
      const prompt = `
            Generate detailed exam material for each chapter listed below. Ensure the content includes all topic points with clear explanations.
            Provide the content in properly formatted HTML using:
            - <h2> for chapter titles
            - <h3> for topic titles
            - <p> for explanations
            - <ul> or <ol> for listing key points

            Do not include <html>, <head>, <body>, or <title> tags.
            Use the following chapters: ${JSON.stringify(chapter)}
            `;

      const res = await generatenotesai(prompt);
      const airesp = await res.response.text();

      await db.insert(CHAPTER_NOTES).values({
        courseId: course?.courseId,
        chapterId: index,
        notes: airesp,
      });
    })
  );

  await db
    .update(STUDY_TABLE)
    .set({ status: "Ready" })
    .where(eq(STUDY_TABLE.courseId, course?.courseId));

  return { chaptersProcessed: chapters.length };
}
