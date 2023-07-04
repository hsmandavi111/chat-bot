require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
  // Add a basePath to the Configuration
  basePath: "https://oai.hconeai.com/v1",
  baseOptions: {
    headers: {
      // Add your Helicone API Key
      "Helicone-Auth": process.env.Helicone,
    },
  },
});

const openai = new OpenAIApi(configuration);

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

let context = "";
app.use(bodyParser.json());
app.use(cors());

var array = [{ role: "system", content: "you are good AI assistant" }];

app.post("/dialogflow/rest/text", async (req, res) => {
  console.log("text: ", `${req.body.text}`);

  var newElement = { role: "user", content: `${req.body.text}` };

  array.push(newElement);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: array,
  });

  context = completion.data.choices[0].message.content;

  newElement = { role: "assistant", content: `${context}` };

  array.push(newElement);

  console.log("array:  ", array);

  console.log("response: ", `${completion.data.choices[0].message.content}`);

  const result = {
    text: completion.data.choices[0].message.content,
  };
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
