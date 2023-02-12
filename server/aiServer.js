let express = require('express')
let cors = require('cors')
let { Configuration, OpenAIApi } = require('openai')


const configuration = new Configuration({
  apiKey: "your openai api key",
})

const openai = new OpenAIApi(configuration)

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello ilark AI!'
  })
})

app.post('/word', async (req, res) => {
  try {
    const prompt = req.body.prompt
    const temperature = req.body.temperature
    // console.log(166, req.body, 167, req.body.prompt)

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: temperature, // Higher values means the model will take more risks.
      max_tokens: 1500, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})


app.post('/advanced', async (req, res) => {
  try {
    const prompt = req.body.prompt
    const temperature = req.body.temperature
    // console.log(166, req.body, 167, req.body.prompt)

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: temperature, 
      max_tokens: 4000, 
      top_p: 1, 
      frequency_penalty: 0, 
      presence_penalty: 0, 
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})


app.post('/code', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    // console.log(166, req.body, 167, req.body.prompt)
    // console.log(111, `${prompt}`)
    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 1200,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\"\"\""],
    });
    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})


app.post('/image', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    // console.log(166, req.body, 167, req.body.prompt)
    let response = await openai.createImage({
      prompt: `${prompt}`,
      n: 1,
      size: "512x512",
    });
    res.status(200).send({
      image_url: response.data.data[0].url
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(6200, () => console.log('AI server started on http://localhost:6200'))