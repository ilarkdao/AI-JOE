import { createDiscreteApi } from "naive-ui"
let { message } = createDiscreteApi(["message"])

export const getCaptcha = async (url) => {
  let obj = {
      method: "GET",
      baseURL
  }
  return await useFetch(url, obj)
}
export const registerApi = async (url, option) => {
  try {
    let response = await fetch(baseURL+url, option)
    if(response.ok){
      let res = await response.json()
      message.success("注册成功", { duration: 5e3 })
      // 成功后直接登录后跳转
      await loginApi ('/userapi/login', option)
    } else {
        let err = await response.text()
        message.error("错误！\n"+err, { duration: 5e3 })
    }
  } catch (error) {
    message.error("错误！\n"+error, { duration: 5e3 })
  }
}
export const loginApi = async (url, option) => {
  try {
    let response = await fetch(baseURL+url, option)
    if(response.ok){
      let res = await response.json()
      // 成功后保存到cookie, 跳转
      let token = useCookie('token', {maxAge: 60 * 60 * 24 * 30})  //30天
      token.value = res.token
      // console.log(256, token)
      let user = useCookie('user', {maxAge: 60 * 60 * 24 * 30})
      user.value = res.newUser
      // console.log(257, "user", user)
      message.success("登录成功", { duration: 5e3 })
      navigateTo("/user/info")
    } else {
        let err = await response.text()
        message.error("错误！\n"+err, { duration: 5e3 })
    }
  } catch (error) {
    message.error("错误！\n"+error, { duration: 5e3 })
  }
}
export const updatepw = async (url, option) => {
  try {
    let response = await fetch(baseURL+url, option)
    if(response.ok){
      let res = await response.json()
      // 成功后删除cookie, 跳转
      let token = useCookie('token')
      token.value = null
      let user = useCookie('user')
      user.value = null
      message.success("修改密码成功！", { duration: 5e3 })
      navigateTo("/login")
    } else {
        let err = await response.text()
        message.error("修改密码错误！\n"+err, { duration: 5e3 })
    }
  } catch (error) {
    message.error("错误！\n"+error, { duration: 5e3 })
  }
}
