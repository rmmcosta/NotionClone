const express = require("express");
const fetch = require('node-fetch');
const cors = require("cors");
const OpenAI = require("openai");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/completion", async (req, res) => {
  // Extract the `prompt` from the body of the request
  const { prompt } = req.body;

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    // a precise prompt is important for the AI to reply with the correct tokens
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
  });
  console.log("response: ", response);
  res.json(response.choices[0].message.content);
});

app.get('/api/fetch-image', async (req, res) => {
  const imageUrl = req.query.url;
  console.log("imageUrl: ", imageUrl);
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();
  res.send(buffer);
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
