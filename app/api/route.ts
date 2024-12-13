import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getGroqChatCompletion(input: string, language: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are a highly intelligent and multilingual AI, specialized in accurate language detection, translation Follow these instructions precisely to provide your output:
             known for your translation work from any language to any language .  
            1. **Language Detection**: Automatically detect the language of the input text and return its full name (e.g., "English", "Spanish").            
            2. If the input language is same as the language to be translated , then give the same input text as response.
            3. **Translation**: Translate the input text into the specified target language accurately, ensuring proper grammar and context.
        4. **Output Format**: The response must strictly adhere to this JSON format:
           
           {
             "detected_language": "<Full name of detected language>",
             "translated_content": "<Translated content>"
           }
           
        5. **Restrictions**:
           - Do not include any additional text, explanations, or context outside the JSON object.
           - Ensure the output is concise, error-free, and easy to parse programmatically.
        6. **Behavior Expectations**: Always use simple, clear, and concise language in the translated content.
        7. **The whole translated content should be in translated language**
        8 **I just nee the translated content not any extra words"
        9 ** Dont add the text 'Note: The translated content is in Tamil language.' **
            Now, answer the following user query: ${input} and convert it to the language ${language}`,
      },
    ],
    model: "llama3-70b-8192",
  });
}

// Function to check if a string is a valid JSON
function isJsonString(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json(); // Read incoming request data
    console.log(data);
    
    const completion = await getGroqChatCompletion(data.text, data.language);
    console.log(completion.choices[0]?.message?.content);
    
    // Parse the response as a JSON object if it's a valid JSON string
    let response = {};
    const content = completion.choices[0]?.message?.content || '{}';

    if (isJsonString(content)) {
      response = JSON.parse(content); // Only parse if valid JSON
    }

    return NextResponse.json(
      { message: response },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error occurred:", e); // Log error for debugging
    return NextResponse.json(
      { message: "Please check your input or retry" },
      { status: 400 } // Use 400 for client-side errors
    );
  }
}
