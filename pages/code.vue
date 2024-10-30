<template>
  <div class="subContainer"> 
    <div id="appcode"> 
      <!-- 模型 -->
      <div flex items-center> 
        <div w-25 flex items-center>
          <p mr-2>预设模型 </p> 
          <n-popover trigger="hover" >
            <template #trigger>
              <div class="i-mdi-alpha-i-circle" hidden lg:flex/>
            </template>
            <span>选择合适的语言模型有利于更为精准的结果</span>
          </n-popover>
        </div>
        <Models ref="ModelRef"></Models> 
      </div> 
      <n-input
        v-model:value="prompt"
        type="textarea"
        rows=2
        placeholder="请输入你的需求......"
      />
      <div text-center  pb-2 v-if="!clickFlag">
        <n-button mt-2 mr-2 type="primary"  @click="submit('The following requirements are implemented in JavaScript:\n\n')" >
          JS实现
        </n-button>
        <n-button mt-2 mr-2 type="primary" @click="submit('The following requirements are implemented in Python:\n\n')" >
          Python实现
        </n-button>
        <n-button mt-2 mr-2 type="primary" @click="submit('The following requirements are implemented in Golang:\n\n')" >
          Golang实现
        </n-button>
        <n-button mt-2 mr-2 type="primary" @click="submit('The following requirements are implemented in Solidity:\n\n')" >
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

// 切换模型
let ModelRef = ref(null)

const clickFlag = ref(false)
const prompt = ref('')
const languageValue = ref('')
if(process.client){
  let lastname = localStorage.getItem("languageValue")
  // console.log(566, "lastname", lastname)
  if(lastname != null){
    languageValue.value = lastname
    // console.log(599, "lastname")
  }
}

let round = 1
let history = []
let historyX = [] //上传API

const submit = async(target) => {	
  if(!token.value){
    message.error("您尚未登录， 呜呜~~", { duration: 5e3 })
    return
  }
  if(prompt.value == ''){
    message.error("文本不能为空！", { duration: 5e3 })
    return
  }

  let model = ModelRef.value.defaultModel
  //更新model 如果与前值不同，就重新赋值
  let setModel = localStorage.getItem(llms)
  if(model != setModel){
    localStorage.setItem(llms, model)
    // console.log(899, "set model", model)
  }

  clickFlag.value = true
  //先判断是不是中文 ，如果中文长度过长，则截取最后两轮
  if(round > 1){
    let str = JSON.stringify(history)
    let isChinese = /.*[\u4e00-\u9fa5]+.*$/.test(prompt.value) 
    // console.log(256, "isChinese", isChinese, prompt.value)
    if(isChinese && str.length > max_zh_length){
      history = history.slice(-4)
    }
    if(!isChinese && str.length > max_en_length){
      history = history.slice(-4)
    }
    // console.log(322, "round", round, "str.length", str.length)
  } 

  let chatContainer = document.querySelector('#chat_container')
  
  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, prompt.value)
 
  //bot's chatstripe
  const uniqueId = generateUniqueId()
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId)
  
  //loading
  const uniqueIdX = generateUniqueId()
  chatContainer.innerHTML += loadingStripe(uniqueIdX)
  
  
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

  // to focus scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight

  historyX = history.slice()
  history.push({role: "user", content: prompt.value})
  historyX.push({role: "user", content: target+prompt.value})
  // let query = [{role: "user", content: target+prompt.value}]
  let dataObj = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.value
      },
      body: JSON.stringify({
          model: model,
          query: historyX,
          temperature: 0.2
      })
  }
  //to clear the textarea input 
  prompt.value = '' 
  const response = await fetch(baseURL+'/streaming', dataObj)
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
            text = text.replace(/\*/g,'')  //去除 *
            // 将本段数据追加到网页之中
            messageDiv.innerHTML += text
            chatContainer.scrollTop = chatContainer.scrollHeight
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

const otherSubmit = async () => {
  if(languageValue.value == ''){
    message.error("语言项不能为空！", { duration: 5e3 })
    return
  }

  let lastname = localStorage.getItem("languageValue")
  //设置或更新
  if(lastname == null || languageValue.value != lastname){
    localStorage.setItem('languageValue', languageValue.value)
    // console.log(899, "set lastname")
  }
  // console.log(63, "otherSubmit", languageValue.value)
  
  //The following requirements are implemented in JavaScript
  let target = 'The following requirements are implemented in '+languageValue.value+': \n\n'
  await submit(target)
}
</script>