// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const courseframework = await openai.chat.completions.create({
//   model: "gpt-4o",
//   messages: [
//     {
//       "role": "user",
//       "content": [
//         {
//           "type": "text",
//           "text": "generate a study material for PYTHON for EXAM and level of difficulty will be EASY with summary of course ,list of chapters along with summary of each chapter, topic list in each chapter,all results in json format"
//         }
//       ]
//     },
//     {
//       "role": "assistant",
//       "content": [
//         {
//           "type": "text",
//           "text": "Here's a JSON-structured study material for an easy-level Python exam:\n\n```json\n{\n  \"course_summary\": \"This Python course is designed for beginners with no prior programming experience. The focus is on introducing basic programming concepts using Python, including variables, data types, control structures, functions, and simple data structures. By the end of this course, students will be able to write simple Python programs and understand foundational programming techniques.\",\n  \"chapters\": [\n    {\n      \"chapter_title\": \"Introduction to Python\",\n      \"chapter_summary\": \"This chapter introduces Python, including its history, features, and why it is a popular programming language. Students will learn how to set up the Python environment and write their first Python program.\",\n      \"topics\": [\n        \"What is Python?\",\n        \"History and Features of Python\",\n        \"Setting up Python Environment\",\n        \"Writing and Running Your First Python Program\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Basic Syntax and Variables\",\n      \"chapter_summary\": \"This chapter covers Python's basic syntax and the use of variables. Students will understand how to declare variables, assign values, and use variables in expressions.\",\n      \"topics\": [\n        \"Python Syntax Basics\",\n        \"Declaring Variables\",\n        \"Data Types: Integers, Floats, Strings\",\n        \"Basic Operations with Variables\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Control Structures\",\n      \"chapter_summary\": \"Learn about control structures in Python to manage the flow of your programs. Understand how to implement conditional statements and loops.\",\n      \"topics\": [\n        \"Conditional Statements (if, elif, else)\",\n        \"Loops (for, while)\",\n        \"Control Flow Statements (break, continue)\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Functions\",\n      \"chapter_summary\": \"This chapter introduces the concept of functions in Python. Learn how to define and call functions to organize and reuse code effectively.\",\n      \"topics\": [\n        \"Defining Functions\",\n        \"Calling Functions\",\n        \"Parameters and Return Values\",\n        \"Scope of Variables\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Data Structures\",\n      \"chapter_summary\": \"Understand basic data structures in Python, such as lists, tuples, and dictionaries, and how to manipulate them.\",\n      \"topics\": [\n        \"Lists and List Operations\",\n        \"Tuples\",\n        \"Dictionaries and Dictionary Operations\",\n        \"Basic List Comprehensions\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Input and Output\",\n      \"chapter_summary\": \"Learn how to handle input from the user and output data to the console. This chapter also covers file handling basics.\",\n      \"topics\": [\n        \"User Input with input() Function\",\n        \"Formatted Output\",\n        \"Reading from and Writing to Files\"\n      ]\n    },\n    {\n      \"chapter_title\": \"Introduction to Error Handling\",\n      \"chapter_summary\": \"Explore basic error handling in Python to write robust programs. Learn how to anticipate and manage exceptions.\",\n      \"topics\": [\n        \"What are Exceptions?\",\n        \"Try and Except Blocks\",\n        \"Handling Multiple Exceptions\",\n        \"Finally Block\"\n      ]\n    }\n  ]\n}\n```\n\nThis JSON structure provides an overview of the easy-level Python exam material, complete with course summary, chapter summaries, and detailed topic lists for each chapter."
//         }
//       ]
//     }
//   ],
//   response_format: {
//     "type": "json_object"
//   },
//   temperature: 1,
//   max_completion_tokens: 5561,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0
// });

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function generateStudyMaterial(topic, studytype, level) {
//   try {
//     const PROMPT = `Generate a study material for ${topic} for ${studytype} and level of difficulty will be ${level} with summary of course, list of chapters along with summary of each chapter, topic list in each chapter, all results in JSON format.`;

//     const airesponse = await openai.chat.completions.create({
//       model: "gpt-4", // Fixed model name from gpt-4o to gpt-4
//       messages: [{ role: "user", content: PROMPT }], // Simplified content structure
//       response_format: { type: "text" },
//       temperature: 1,
//       max_tokens: 500, // Increased token limit for longer responses
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0
//     });

//     if (!airesponse.choices || !airesponse.choices[0]?.message?.content) {
//       throw new Error("Invalid response from OpenAI API");
//     }

//     return JSON.parse(airesponse.choices[0].message.content);
//   } catch (error) {
//     console.error("Error generating study material:", error);
//     throw new Error(`Failed to generate study material: ${error.message}`);
//   }
// // }


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
  

  // const airesponse = await openai.chat.completions.create({
  //   model: "gpt-4o",
  //   messages: [{ role: "user", content: [{ type: "text", text: PROMPT }] }],
  //   response_format: { type: "text" },
  //   temperature: 1,
  //   max_tokens: 2561,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0
  // });

  // return JSON.parse(airesponse.choices[0].message.content);

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