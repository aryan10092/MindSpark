const GEMINI_API_KEY = process.env.GOOGLE_AI_API_KEY;

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";

function ensureGeminiApiKey() {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "Missing Gemini API key. Set GEMINI_API_KEY or GOOGLE_GEMINI_API_KEY in your environment."
    );
  }
}

async function callGemini(prompt, { temperature = 1, responseMimeType } = {}) {
  ensureGeminiApiKey();

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature,
        responseMimeType,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const parts = data?.candidates?.[0]?.content?.parts;
  const text = Array.isArray(parts)
    ? parts.map((part) => part?.text || "").join("\n")
    : "";

  if (!text.trim()) {
    throw new Error("No content returned from Gemini.");
  }

  return text;
}

export async function generateStudyMaterial(topic, studytype, level) {
  const prompt = `Generate a study material for ${topic} for ${studytype} and level of difficulty will be ${level} with summary of course, list of chapters along with summary of each chapter and add emoji in each chapter, topic list in each chapter, all results in JSON format.`;

  const text = await callGemini(prompt, {
    temperature: 1,
    responseMimeType: "application/json",
  });

  return JSON.parse(text);
}

export const courseframework = {
  async sendMessage(prompt) {
    const text = await callGemini(prompt, {
      temperature: 1,
      responseMimeType: "application/json",
    });

    return {
      response: {
        text: async () => text,
      },
    };
  },
};

export async function generatenotesai(prompt) {
  try {
    const text = await callGemini(prompt, {
      temperature: 1,
      responseMimeType: "text/plain",
    });

    return {
      response: {
        text: async () => text,
      },
    };
  } catch (error) {
    console.error("Error in generatenotesai:", error);
    throw error;
  }
}
