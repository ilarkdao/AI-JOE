<template>
  <div class="subContainer"> 
    <div id="appcode"> 
      <n-input
        v-model:value="prompt"
        type="textarea"
        rows=2
        placeholder="请输入你的需求......"
      />
      <div text-center  pb-2 v-if="!clickFlag">
        <n-button mt-2 mr-2 type="primary"  @click="submit('用JavaScript实现以下需求：\n\n')" >
          JS实现
        </n-button>
        <n-button mt-2 mr-2 type="primary" @click="submit('用Python实现以下需求：\n\n')" >
          Python实现
        </n-button>
        <n-button mt-2 mr-2 type="primary" @click="submit('用Golang实现以下需求：\n\n')" >
          Golang实现
        </n-button>
        <n-button mt-2 mr-2 type="primary" @click="submit('用Solidity实现以下需求：\n\n')" >
          Solidity实现
        </n-button>
        <n-button mt-2 mr-2 w-40  type="primary"> 
          <n-input  v-model:value="languageValue" type="text" placeholder="输入语言" />
          <span ml-4 @click="otherSubmit">实现</span>
        </n-button>
      </div>

      <div id="chat_container"></div>  
    </div>
  </div>
</template>

<script setup>
import "@/assets/style.css";
import user from "@/assets/img/user.svg"
import bot from "@/assets/img/bot.png"
import { createDiscreteApi } from "naive-ui"
import loading from '/loading.gif'
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')
useHead({
  title:"编程"
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

const clickFlag = ref(false)
const prompt = ref('')
const languageValue = ref('')
if(process.client){
  let lastname = localStorage.getItem("languageValue")
  console.log(566, "lastname", lastname)
  if(lastname != null){
    languageValue.value = lastname
    console.log(599, "lastname")
  }
}

const submit = async(target) => {	
  if(!token.value){
    message.error("您尚未登录， 呜呜~~", { duration: 5e3 })
    return
  }
  if(prompt.value == ''){
    message.error("文本不能为空！", { duration: 5e3 })
    return
  }
  clickFlag.value = true
  let chatContainer = document.querySelector('#chat_container')
  
  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, prompt.value)
 
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
      
  let query = [{role: "user", content: target+prompt.value}]
  let dataObj = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.value
      },
      body: JSON.stringify({
          query: query,
          temperature: 0.2
      })
  }
  //to clear the textarea input 
  prompt.value = '' 
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
      
  } else {
      const err = await response.text()
      clickFlag.value = false
      messageDiv.innerHTML = "Something went wrong"
      message.error("错误！\n"+err, { duration: 5e3 })
  }   
}

const otherSubmit = async () => {
  if(languageValue.value == ''){
    message.error("语言项不能为空！", { duration: 5e3 })
    return
  }
  //('用Solidity实现以下需求：\n\n')
  let lastname = localStorage.getItem("languageValue")
  //设置或更新
  if(lastname == null || languageValue.value != lastname){
    localStorage.setItem('languageValue', languageValue.value)
    console.log(899, "set lastname")
  }
  console.log(63, "otherSubmit", languageValue.value)

  let target = '用'+languageValue.value+'实现以下需求：\n\n'
  await submit(target)
}
</script>