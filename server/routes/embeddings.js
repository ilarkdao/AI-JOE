import express from 'express'
import { Configuration, OpenAIApi } from 'openai'
import {readDb, writeDb, getSimilarTextFromDb} from '../dbFunction.js'

let dbName = './russiaU.json'
let dbData = readDb(dbName)

const router = express.Router()

const configuration = new Configuration({
    apiKey: "openai API KEY",
  })
  
const openai = new OpenAIApi(configuration)

//保存文本的向量值 
router.route('/saveembedding').post(async (req, res) => {
  try {
    const prompt = req.body.prompt  

    // embed the input
    const inputEmbeddingResponse = await openai.createEmbedding({       
      model: "text-embedding-ada-002",
      input: prompt
    });
    const inputEmbedding = inputEmbeddingResponse.data.data[0].embedding
    let obj = {
      "text": prompt,
      "embedding": inputEmbedding
    }
    writeDb(obj, dbName)

    res.status(200).send({
      result: "ok"
  })

  } catch (err) {
      console.error(err)
      res.status(500).send('Something went wrong')
  }
})  

//1. 先是查找文本的向量值
//2. 再和预先准备的数据集比对，选出拟合度最高的文本
//3. 选出的文本和用户的关键词拼接，再查询
router.route('/embeddingreq').post(async (req, res) => {
  try {
    const prompt = req.body.prompt  

    const inputEmbeddingResponse = await openai.createEmbedding({       
      model: "text-embedding-ada-002",
      input: prompt
    })
    const inputEmbedding = inputEmbeddingResponse.data.data[0].embedding
    const context = getSimilarTextFromDb(inputEmbedding, dbData)
    // console.log(289,"getSimilarTextFromDb", context)

    let promptX = `我希望你充当俄罗斯和乌克兰的问题专家。我会向您提供有关俄罗斯和乌克兰问题所需的所有信息，而您的职责是用简易和严谨的语言解答我的问题。\n${context}\n${prompt}`
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: promptX,
      temperature: 0.2, 
      max_tokens: 3000, 
      top_p: 1, 
      frequency_penalty: 0, 
      presence_penalty: 0, 
    })

    res.status(200).send({
      bot: response.data.choices[0].text
  })

  } catch (err) {
      console.error(455, err)
      res.status(500).send('Something went wrong')
  }
}) 

export default router