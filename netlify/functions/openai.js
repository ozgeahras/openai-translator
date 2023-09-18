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
      model: "text-davinci-003",
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
      max_tokens: 10,
    });

    const reply = response.data.choices[0].text;
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
