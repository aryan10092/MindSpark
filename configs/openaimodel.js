
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateStudyMaterial(topic, studytype, level) {
  const PROMPT = `Generate a study material for ${topic} for ${studytype} and level of difficulty will be ${level} with summary of course, list of chapters along with summary of each chapter and add emoji in each chapter, topic list in each chapter, all results in JSON format.`;

  const airesponse = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: [{ type: "text", text: PROMPT }] }],
    response_format: { type: "json_object" },
    temperature: 1,
    max_tokens: 1561,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });

  return JSON.parse(airesponse.choices[0].message.content);
}


export async function generatenotesai(PROMPT) {
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", 
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: PROMPT,
            },
          ],
        },
      ],
      response_format: {
        type: "text", 
      },
      temperature: 1,
      max_completion_tokens: 1682,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const airesp = response.choices[0]?.message?.content;
    if (!airesp) {
      throw new Error('No content returned from AI');
    }

    return { response: { text: () => airesp } };
  } catch (error) {
    console.error("Error in generatenotesai:", error);
    throw error;
  }

}
