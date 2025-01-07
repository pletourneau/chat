import { Configuration, OpenAIApi } from "openai";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    // Parse incoming request
    const body = await req.json();

    // Set up OpenAI API configuration
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Call the OpenAI API with the user's message
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: body.messages,
    });

    // Return the assistant's reply
    return new Response(
      JSON.stringify({ reply: response.data.choices[0].message.content }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch chatbot response." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
