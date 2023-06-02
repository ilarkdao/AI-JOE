export const baseURL = "http://localhost:6200" 

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
