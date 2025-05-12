export const baseURL = "https://api.ilark.io"
<<<<<<< HEAD
// export const baseURL = "http://43.132.209.216:6200"
// export const baseURL = "http://localhost:6200"

//设置语言模型
export const llms = "joe-llms7"

//设置视觉模型
export const vllms = "joe-vllms1"

=======
// export const baseURL = "http://43.154.196.227:6200"  
// export const baseURL = "http://localhost:6200" 

>>>>>>> parent of c04a9ed... v7.3 update,add new llm
//对话中最大的中文和英文长度
export const max_zh_length = 1600
export const max_en_length = 11000

const option = {
  method: "POST",
  headers: { 'Content-Type': 'application/json' },
  baseURL 
}
const getOption = {
  method: "GET",
  headers: { 'Content-Type': 'application/json' },
  baseURL 
}

export const postHttp = async (url, body, token) => {
  option.headers.Authorization = 'Bearer ' + token
  let obj = {
      ...option,
      body
  }
  return await useFetch(url, obj)
}

//查询余额
export const getHttp = async (url, token) => {
  getOption.headers.Authorization = 'Bearer ' + token
  return await useFetch(url, getOption)
}
