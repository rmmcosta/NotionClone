const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");
const { OpenAIApi, Configuration } = require("openai-edge");
const { OpenAIStream, StreamingTextResponse } = require("ai");

const app = express();
app.use(cors());
app.use(express.json());

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

app.post("/api/completion", async (req, res) => {
  const { prompt } = req.body;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a helpful AI embedded in a notion text editor app that is used to autocomplete sentences
          The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.`,
      },
      {
        role: "user",
        content: `
      I am writing a piece of text in a notion text editor app.
      Help me complete my train of thought here: ##${prompt}##
      keep the tone of the text consistent with the rest of the text.
      keep the response short and sweet.
      `,
      },
    ],
    stream: true,
  });
  const stream = OpenAIStream(response);
  res.json(new StreamingTextResponse(stream));
});

app.post("/api/chat", async (req, res) => {
  // Extract the `prompt` from the body of the request
  const { prompt } = req.body;

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: false,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: "user",
        content: `Given the following post content, detect if it has typo or not. 
Respond with a JSON array of typos ["typo1", "typo2", ...] or an empty [] if there's none. Only respond with an array. Post content:
${prompt}
        
Output:\n`,
      },
    ],
    max_tokens: 200,
    temperature: 0, // you want absolute certainty for spell check
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  res.json(response);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
