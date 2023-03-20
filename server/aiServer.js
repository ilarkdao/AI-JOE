import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
import hfRouter from './routes/huggingFace.js'
import embedRouter from './routes/embeddings.js'

const configuration = new Configuration({
  apiKey: "sk-xxxxxx", 
})

const openai = new OpenAIApi(configuration)

//提取中间的字符串，清洗openai字符串
function getReg(text){
  //"content":"我是中"},"index"  提取中间的字符串
  let reg = /(?<=\"content\"\:\")[\s\S]*?(?=\"\}\,\"index\")/g
  let a = text.match(reg)
  if(a === null){
    return
  }
  return a.join('')
}

const app = express()
app.use(cors())
app.use(express.json())

app.use('/generator', hfRouter)
app.use('/embeddings', embedRouter)

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello ilark AI!'
  })
})

//chatgpt api 
app.post('/gpt', async (req, res) => {
  try {
    const query = req.body.query
    const temperature = req.body.temperature

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: JSON.parse(query),
      temperature: temperature, 
      max_tokens: 4000, 
      top_p: 1, 
      frequency_penalty: 0, 
      presence_penalty: 0, 
    })

    res.status(200).send({
      message: response.data.choices[0].message
    });

  } catch (error) {
    console.error(111, error)
    res.status(500).send('Something went wrong')
  }
})

//gpt streaming 
app.post('/gptstreaming', (req, res) => {
  const query = req.body.query
  // console.log(356, "get req", query)
  try {
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders() // flush the headers to establish SSE with client

    const response = openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: query,
      max_tokens: 3000,
      temperature: 0.2,
      stream: true,
    }, { responseType: 'stream' })

    response.then(resp => {
      resp.data.on('data', data => {
          const lines = data.toString().split('\n').filter(line => line.trim() !== '')
          for (const line of lines) {
              const message = line.replace(/^data: /, '')
              if (message === '[DONE]') {
                // console.log(996, "done")
                  res.end()
                  return
              }
              let strTemp = getReg(message)
              if(strTemp != null){
                // console.log(1188, "strTemp", strTemp)
                res.write(strTemp)
              }
          }
      })
    })
  } catch (error) {
    console.error(1112, error)
    res.status(500).send('Something went wrong')
  }
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
    console.error(112, error)
    res.status(500).send('Something went wrong');
  }
})


app.post('/advanced', async (req, res) => {
  try {
    const prompt = req.body.prompt
    const temperature = req.body.temperature

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: temperature, 
      max_tokens: 3000, 
      top_p: 1, 
      frequency_penalty: 0, 
      presence_penalty: 0, 
    })

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(123, error)
    res.status(500).send('Something went wrong');
  }
})


app.post('/code', async (req, res) => {
  try {
    const prompt = req.body.prompt

    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 1200,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\"\"\""],
    })
    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(233, error)
    res.status(500).send('Something went wrong')
  }
})


app.post('/image', async (req, res) => {
  try {
    const prompt = req.body.prompt

    let response = await openai.createImage({
      prompt: `${prompt}`,
      n: 1,
      size: "512x512",
    });
    res.status(200).send({
      image_url: response.data.data[0].url
    });

  } catch (error) {
    console.error(244, error)
    res.status(500).send('Something went wrong');
  }
})

app.listen(6200, () => console.log('AI server started on http://localhost:6200'))