<template>
  <div px-5 pt-5> 
    <div bg-white rounded mt-4.5 pb-6 px-4 lg:px-10 min-h-85vh shadow-sm> 
      <p text-4.5 text-gray-600 text-center pt-2 h-10>图像转前端代码</p>

      <!-- 上传图片 -->
      <n-upload mt-2 mb-4
        :default-upload="false"
        list-type="image-card"
        multiple
        @change="handleChangeX"
      >
        上传图像
      </n-upload>

      <div text-center v-if="loadingFlag"><img :src="loadingX" alt="ai joe loading"></div>

      <!-- 模型 -->
      <div flex items-center> 
        <div flex items-center>
          <p mr-2>图像模型 </p> 
          <n-popover trigger="hover" >
            <template #trigger>
              <div class="i-mdi-alpha-i-circle" hidden lg:flex/>
            </template>
            <span>选择合适的图像模型有利于更为精准的结果</span>
          </n-popover>
        </div>
        <VisionModels ref="vModelRef"></VisionModels> 
      </div> 
      
      <div text-center mt-2 pb-2 v-if="!clickFlag">
        <n-button block items-center type="primary"  @click="submit" >
          提交
        </n-button>
      </div>

      <div mt-4 mb-2 v-if="infoFlag">将网页截图转成前端代码（html, css, js）输出</div>

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
import "@/assets/style.css";
import user from "@/assets/img/user.svg"
import bot from "@/assets/img/bot.png"
import { createDiscreteApi } from "naive-ui"
import loadingX from '/loading.gif'
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')
useHead({
  title:"图像转前端代码"
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

// 切换模型
let vModelRef = ref(null)
const clickFlag = ref(false)
const clearFlag = ref(false)
const infoFlag = ref(true)
const prompt = ref('识别图片的网站布局，同时充当前端开发专家。你的任务是根据图片提供的细节写出前端代码(html, css 和 js)，以完整的页面格式输出')

const imgX = ref(null)
let round = 1
let history = []
let historyX = [] //上传API
let messageEnd = ref(null)

//上传图片
const handleChangeX = async (options) => {
  if(options.fileList.length == 0) {
    return
  }
  loadingFlag.value = true
  clickFlag.value = true
  // handleClick(options.fileList[0].file) 
  imgX.value = await upImage(options.fileList[0].file)
  loadingFlag.value = false
  clickFlag.value = false
  console.log(5566,"imgX", imgX.value)
}

const submit = async() => {	
  if(!token.value){
    message.error("您尚未登录， 呜呜~~", { duration: 5e3 })
    return
  }
  if(imgX.value == null){
    message.error("您尚未上传图片！", { duration: 5e3 })
    return
  }
  infoFlag.value = false
  console.log(999,"55 imgX", imgX.value)
  
  let model = vModelRef.value.visionModel
  //更新model 如果与前值不同，就重新赋值
  let setModel = localStorage.getItem(vllms)
  if(model != setModel){
    localStorage.setItem(vllms, model)
    // console.log(899, "set model", model)
  }

  clickFlag.value = true

  let chatContainer = document.querySelector('#chat_container')
  
  // user's chatstripe
  // chatContainer.innerHTML += chatStripe(false, prompt.value)
 
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

  let viewContent = [
    { type: "text", text: prompt.value},
    {
      type: "image_url",
      image_url: {"url": imgX.value},
    },
  ]

  // historyX = history.slice()
  // history.push({role: "user", content: prompt.value})
  history.push({role: "user", content: viewContent})
  console.log(5589, "history", history)

  let dataObj = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.value
      },
      body: JSON.stringify({
          model: model,
          query: history,
          imgUrl: imgX.value
      })
  }
  //to clear the textarea input 
  prompt.value = '' 
  const response = await fetch(baseURL+'/vision', dataObj)
  messageDiv.innerHTML = " "
  if (response.ok) {	
      let i = 0
      let getStream = function (reader) {
          return reader.read().then(function (result) {
            // 如果数据已经读取完毕，直接返回
            if (result.done) {
              // console.log(889, "result done")
              // clickFlag.value = false
              clearInterval(loadInterval)  
              loading.textContent = ''
              clearFlag.value = true
              messageEnd.value = messageDiv.innerHTML
              return
            }
            // 取出本段数据（二进制格式）
            let chunk = result.value
            let text = utf8ArrayToStr(chunk)
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

const clear = () => {
  //刷新页面
  let router = useRouter()
  router.go(0)
}

const copyText = () => {
  console.log(996, messageEnd.value)
  navigator.clipboard
    .writeText(messageEnd.value)
    .then(() => {
      console.log("Text copied to clipboard")
    })
    .catch((error) => {
      console.error("Failed to copy text: ", error)
    })
}

</script>