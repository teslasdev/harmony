const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const { OpenAI } = require("langchain/llms/openai");
const  { BufferMemory } = require("langchain/memory");
const { ConversationChain } = require("langchain/chains");
const {
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    ChatPromptTemplate,
    MessagesPlaceholder,
  } = require("langchain/prompts");
const chat = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY , temperature: 0 , maxTokens: 1000 });
app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname + '/frontend')); // Serves resources from client folder

app.post('/get-prompt-result', async (req, res) => {
    // Get the prompt from the request body
    const {prompt, model = 'gpt'} = req.body;
    const defaultText = ["hello" , "hi" , "hi" , "hii" , "hiiiiii" , "how fa" , "helo" , "hlo" , "hey"]
    // Check if prompt is present in the request
    if (!prompt) {
        // Send a 400 status code and a message indicating that the prompt is missing
        return res.status(400).send({error: 'Prompt is missing in the request'});
    }

    else if(defaultText.includes(prompt.toLowerCase())) {
        return res.send("Hello, How can I assit you today with our creative Ai?");
    }

    try {
        const chatPrompt = ChatPromptTemplate.fromPromptMessages([
            new MessagesPlaceholder("history"),
            HumanMessagePromptTemplate.fromTemplate("{input}"),
          ]);
          
          const chain = new ConversationChain({
            memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
            prompt: chatPrompt,
            llm: chat,
          });

          const responseH = await chain.call({
            input: prompt
          });
          
           return res.send(responseH.response);
    } catch (error) {
        const errorMsg = error.response ? error.response.data.error : `${error}`;
        console.error(errorMsg);
        // Send a 500 status code and the error message as the response
        return res.status(500).send(errorMsg);
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
