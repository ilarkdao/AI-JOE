<template>
  <div px-5 pt-5> 
    <div bg-white rounded mt-4.5 pb-6 px-4 lg:px-10 min-h-85vh shadow-sm> 
      <p text-4.5 text-gray-600 text-center pt-2 h-10>多智能体</p>

      <div text-center v-if="loadingFlag"><img :src="loadingX" alt="ai joe loading"></div>

      <n-input
        v-model:value="prompt"
        type="textarea"
        rows=2
        :disabled='clickFlag'
        placeholder="请输入你的任务......"
      />
      
      <div text-center mt-2 pb-2 v-if="!clickFlag">
        <n-button block items-center type="primary"  @click="submit" >
          提交
        </n-button>
      </div>

      <div mt-4 mb-2 v-if="!clickFlag">集成了网络搜索、爬虫、代码解释器等功能，擅长解决一些复杂的问题，运行需要数分钟。</div>
      <div mt-4 mb-2 v-if="!clickFlag">如果超时，可直接查看左侧的历史记录。</div>

      <div id="chat_container"></div>

      <div text-right mt-1 pb-2 v-if="clearFlag">
        <n-button quaternary @click="copyText" >
          复制
        </n-button>
        <n-button quaternary @click="clear" >
          清除
        </n-button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { NButton, NInput, createDiscreteApi } from "naive-ui"
import "~/assets/style.css";
import user from "~/assets/img/user.svg"
import bot from "~/assets/img/bot.png"

import loadingX from '/loading.gif'
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')
useHead({
  title:"多智能体"
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

let loadingFlag = ref(false)

const clickFlag = ref(false)
const clearFlag = ref(false)
const prompt = ref('')
let messageEnd = ref(null)

const submit = async() => {	
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

  let dataObj = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.value
      },
      body: JSON.stringify({
          ask: prompt.value,
      })
  }
  const response = await fetch(baseURL+'/agentapi', dataObj)
  messageDiv.innerHTML = " "
  prompt.value = '' 
  if (response.ok) {	
      let resX = await response.json()
      // let resX = await response.text()
      // console.log(169, resX)

      let text = resX.content
      text = text.replace(/\\n/g,'<br/>')  //替换换行符
      text = text.replace(/\*/g,'')  //去除 *
      text = text.replace(/\#/g,'')  //去除 #

      messageDiv.innerHTML = text
      messageEnd.value = text
      clearFlag.value = true
      // clickFlag.value = false
      clearInterval(loadInterval)  
      loading.textContent = ''
      chatContainer.scrollTop = chatContainer.scrollHeight
  } else {
      const err = await response.text()
      clickFlag.value = false
      messageDiv.innerHTML = "Something went wrong"
      message.error("错误！\n"+err, { duration: 5e3 })
  }   
}

const copyText = () => {
  // console.log(996, messageEnd.value)
  navigator.clipboard
    .writeText(messageEnd.value)
    .then(() => {
      console.log("Text copied to clipboard")
    })
    .catch((error) => {
      console.error("Failed to copy text: ", error)
    })
}

const clear = () => {
  //刷新页面
  let router = useRouter()
  router.go(0)
  // clickFlag.value = false
  // clearFlag.value = false
}

</script>