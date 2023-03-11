import fs from 'fs'

function readDb(dbName) {
    const data = fs.readFileSync(dbName, "utf-8")
    return JSON.parse(data)
}

function writeDb(obj, dbName) {
    if (!obj) {return console.log("Please provide data to save!")}
    try {
        let data = readDb(dbName)
        data.push(obj)
        fs.writeFileSync(dbName, JSON.stringify(data, null, 2))
        return console.log("Save succesful")
    } catch (e) {
        return console.log("Save failed! with the following errror:", e)
    }
}

//查找两段文本的相似度
function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0
    let normA = 0
    let normB = 0
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i]
        normA += Math.pow(vecA[i], 2)
        normB += Math.pow(vecB[i], 2)
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

//从数据集中查找拟合度最高的两段文本
function getSimilarTextFromDb(inputEmbedding, jsonData) {
    let result = []
    jsonData.forEach(embedding => {
        let similarity = cosineSimilarity(inputEmbedding, embedding.embedding)
        console.log("similarity", similarity)
        if (similarity > 0.8) {
            result.push({
                text: `${embedding.text}`,
                similarity: similarity
            })
        }
    })
    result.sort((a, b) => b.similarity - a.similarity)
    let topTwo = result.slice(0, 2)
    return topTwo.map(r => r.text).join("")
  }

export {readDb, writeDb, getSimilarTextFromDb}