import { Configuration, OpenAIApi } from "openai-edge";
import OPENAI_API_KEY from "../config/openai";

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateImagePrompt(name: string): Promise<string> {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an creative and helpful AI assistance capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled",
        },
        {
          role: "user",
          content: `Please generate a thumbnail description for my notebook titles ${name}`,
        },
      ],
    });
    const data = await response.json();
    console.log(data);
    if (data.choices.length > 0) {
      console.log(data);
      const image_description = data.choices[0].message.content;
      return image_description as string;
    } else {
      return "empty placeholder image";
    }
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      const retryAfter = error.response.headers["retry-after"];
      console.log(`Rate limit exceeded. Retry after ${retryAfter} seconds.`);
    }
    return "empty placeholder image";
  }
}

export async function generateImage(image_description: string) {
  try {
    const response = await openai.createImage({
      prompt: image_description,
      n: 1,
      size: "256x256",
    });
    const data = await response.json();
    const image_url = data.data[0].url;
    return image_url as string;
  } catch (error) {
    console.error(error);
  }
}
