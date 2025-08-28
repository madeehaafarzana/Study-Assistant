import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { QuestionAnswer, Difficulty, Standard, ChatSession } from '../types';

// if (!process.env.API_KEY) {
//     throw new Error("API_KEY environment variable not set");
// }

// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const apiKey = import.meta.env.VITE_API_KEY as string;
if (!apiKey) {
  throw new Error("VITE_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: "An important question or the name of an algorithm/program to be explained.",
      },
      answerSteps: {
        type: Type.ARRAY,
        description: "A list of strings, where each string is a part of the answer, explanation, or a code snippet.",
        items: {
          type: Type.STRING,
        },
      },
    },
    required: ["question", "answerSteps"],
  },
};

const getPrompt = (chapterName: string, difficulty: Difficulty, standard: Standard): string => {
  const basePrompt = `You are a friendly and engaging computer science tutor creating study material for ${standard} students in India, based on the NCERT syllabus. For the chapter titled "${chapterName}", generate 5 to 7 important items. The items should be a mix of:
1.  **Conceptual Questions**: Important, exam-oriented theoretical questions.
2.  **Algorithm/Program Explanations**: For any key algorithms or programs in this chapter, frame the explanation as a question (e.g., 'Explain the Bubble Sort algorithm.' or 'Write a Python program to... and explain how it works.').

The answer for an algorithm/program should include:
- The core logic in simple terms.
- A step-by-step breakdown or pseudocode.
- A simple and clear Python code example.
- A brief explanation of how the code works.
Place the entire response, including the code, inside the 'answerSteps' array.`;

  if (difficulty === 'simple') {
    return `${basePrompt} For each item, provide a very simple, clear, and step-by-step answer, as if you're explaining it to a friend. Break down the answer into "baby steps". Use analogies and explain code line-by-line. The tone should be encouraging and straightforward.`;
  } else {
    return `${basePrompt} For each item, provide a more detailed, comprehensive explanation suitable for thorough exam preparation. Include key definitions, relevant code snippets, and connections between concepts. For algorithms, briefly mention time complexity where relevant. Explain the code's overall structure and purpose. The tone should be authoritative yet accessible.`;
  }
};


export async function getChapterContent(chapterName: string, difficulty: Difficulty, standard: Standard): Promise<QuestionAnswer[]> {
  try {
    const prompt = getPrompt(chapterName, difficulty, standard);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedData: QuestionAnswer[] = JSON.parse(jsonText);
    return parsedData;
  } catch (error) {
    console.error("Error fetching or parsing chapter content:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get content for "${chapterName}". ${error.message}`);
    }
    throw new Error(`An unknown error occurred while fetching content for "${chapterName}".`);
  }
}

export function startChatSession(chapter: string, standard: Standard): ChatSession {
    const chat: Chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are an expert Computer Science tutor for students in India. The user is currently studying the chapter "${chapter}" for the "${standard}" syllabus. Answer their questions clearly, concisely, and directly related to this topic. Use simple language and code examples where helpful.`,
        },
    });
    return chat;
}

export async function continueChat(chat: ChatSession, message: string): Promise<string> {
    try {
        const response = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error continuing chat:", error);
        if (error instanceof Error) {
          return `Sorry, I encountered an error: ${error.message}`;
        }
        return "Sorry, I couldn't get a response. Please try again.";
    }
}