import express from 'express'
import fetch from "node-fetch"

const router = express.Router()

let API_TOKEN = "hf_xxxx"   //huggingface API_TOKEN

router.route('/').post(async (req, res) => {
  try {
    const prompt = req.body.prompt  
    // console.log(123, "hg route post", prompt)

    const response = await fetch(
      'https://api-inference.huggingface.co/models/succinctly/text2image-prompt-generator',  //midjourney
      {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
          method: "POST",
          body: prompt,
      }
    )
    const result = await response.json()
    // console.log(33, result)
    // console.log(22, result[0].generated_text)

    res.status(200).send({
      message: result[0].generated_text
  })

  } catch (err) {
      console.error(556, err)
      res.status(500).send('Something went wrong');
  }
})  

export default router