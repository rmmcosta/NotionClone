const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const { pipeline, PassThrough } = require("stream");

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/completion", (req, res) => {
  const { prompt } = req.body;

  const responsePromise = openai.chat.completions.create({
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
  });

  const pass = new PassThrough({ objectMode: true });
  responsePromise
    .then((response) => {
      pass.write(JSON.stringify(response.choices[0].message.content));
      pass.end();
    })
    .catch((error) => {
      pass.emit("error", error);
    });

  pipeline(
    pass,
    res,
    (err) => {
      if (err) {
        console.error("An error occurred: ", err);
        res.sendStatus(500);
      }
    }
  );
});

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
