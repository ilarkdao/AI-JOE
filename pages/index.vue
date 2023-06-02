<template>
  <div class="subContainer">
		<div id="app2">
			<div id="chat_container"></div>  
			<form>
				<textarea name="prompt" rows="1" cols="1" placeholder="请输入你的问题..." :disabled='clickFlag'></textarea>
				<button @click="submit" :disabled='clickFlag'><img src="@/assets/img/send.svg" alt="send" /></button>		
			</form>
		</div>

  </div>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
let { message } = createDiscreteApi(["message"])
import "@/assets/style.css"
import user from "@/assets/img/user.svg"
import bot from "@/assets/img/bot.png"
const token = useCookie('token')
useHead({
  title:"AI·Joe，如影似人"
})
const loadingStripe = (uniqueId) => {
    return (
        `<span style='font-size: 20px;color: #191970;' id=${uniqueId}></span>`
    )
}
const chatStripe = (isAi, value, uniqueId) => {
  return (
    `
      <div class="wrapper ${isAi && 'ai'}">
          <div class="chat">
              <div class="profile">
                  <img 
                    src=${isAi ? bot : user} 
                    alt="${isAi ? 'bot' : 'user'}" 
                  />
              </div>
              <div class="message" id=${uniqueId}>${value}</div>
          </div>
      </div>
    `
  )
}

let clickFlag = ref(false)
let prompt = ref('')
let history = [ {role: "system", content: "You are a helpful assistant."}]
let round = 1
const submit = async(e) => {	
  e.preventDefault()
  if(!token.value){
    message.error("您尚未登录， 呜呜~~", { duration: 5e3 })
    return
  }
  
  let form = document.querySelector('form')
  let chatContainer = document.querySelector('#chat_container')
  
  let data = new FormData(form)

  if(data.get('prompt') == ''){
    message.error("文本不能为空！", { duration: 5e3 })
    return
  }
  //先判断是不是中文 ，如果中文长度过长，则重置
  if(round > 0){
    let str = JSON.stringify(history)
    let isChinese = /.*[\u4e00-\u9fa5]+.*$/.test(data.get('prompt')) 
    // console.log(256, "isChinese", isChinese, data.get('prompt'))
    if(isChinese && str.length > 1600){
      history = [ {role: "system", content: "You are a helpful assistant."}]
    }
    if(!isChinese && str.length > 11000){
      history = [ {role: "system", content: "You are a helpful assistant."}]
    }
    // console.log(322, "history", history, "round", round, "str.length", str.length)
  }

  clickFlag.value = true
  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'))
  
  //to clear the textarea input 
  form.reset()
  
  //bot's chatstripe
  const uniqueId = generateUniqueId()
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId)
  
  //loading
  const uniqueIdX = generateUniqueId()
  chatContainer.innerHTML += loadingStripe(uniqueIdX)
  
  // to focus scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight
  
  // specific message div
  const messageDiv = document.getElementById(uniqueId)
  
  // const loading = document.getElementById('loadingTs')	
  const loading = document.getElementById(uniqueIdX)
  loading.textContent = ''
  let loadInterval = setInterval(() => {
      // Update the text content of the loading indicator
      loading.textContent += '...'
        
      // If the loading indicator has reached 15 dots, reset it
      if (loading.textContent === '...............') {
          loading.textContent = '...'
      }
  }, 300)
      
  history.push({role: "user", content: data.get('prompt')})
  let dataObj = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.value
      },
      body: JSON.stringify({
          query: history,
          temperature: 0.2
      })
  }

  const response = await fetch(baseURL+'/gptstreaming', dataObj)
  messageDiv.innerHTML = " "
  if (response.ok) {	
      let i = 0
      let getStream = function (reader) {
          return reader.read().then(function (result) {
            // 如果数据已经读取完毕，直接返回
            if (result.done) {
              // console.log(889, "result done")
              clickFlag.value = false
              clearInterval(loadInterval)  
              loading.textContent = ''
              history.push({ 'role': 'assistant', 'content': messageDiv.innerHTML})
              // console.log(677, "history", history)
              return
            }
            // 取出本段数据（二进制格式）
            let chunk = result.value
            // console.log(1267, chunk, typeof chunk)  //unit8array object
            let text = utf8ArrayToStr(chunk)
            if(i === 0){
              text = text.replace(/\\n/g,'')  //去除首段换行
            } else{
              text = text.replace(/\\n/g,'<br/>')
            }
            // 将本段数据追加到网页之中
            messageDiv.innerHTML += text
            i ++
            // 递归处理下一段数据
            return getStream(reader)
          })
      }
      getStream(response.body.getReader())

      round ++
  } else {
      const err = await response.text()
      clickFlag.value = false
      messageDiv.innerHTML = "Something went wrong"
      message.error("错误！\n"+err, { duration: 5e3 })
  }
      
}

</script>