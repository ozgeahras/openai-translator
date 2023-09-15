import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-8sBBKnnzpa0m1QQdIgYJtvhS",
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function handler(event) {
  try {
    const { text } = JSON.parse(event.body);
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      prompt: `Translate this to turkish.
      ###
      outline: ${text}
      message: 
      `,
      max_tokens: 60,
      presence_penalty: 0,
      frequency_penalty: 0.3,
    });

    console.log(response);
    const reply = response.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
}
