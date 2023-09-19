import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-8sBBKnnzpa0m1QQdIgYJtvhS",
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function handler(event) {
  try {
    const { text } = JSON.parse(event.body);
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Translate this to Turkish.
              ###
              outline: Hello
              message: merhaba
              ###
              outline: How are you
              message: nasılsın
              ###
              outline: ${text}
              message: 
              `,
      max_tokens: 200,
    });

    const result = response.data.choices[0].text;
    const reply = result.trim().toLowerCase();
    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
}
