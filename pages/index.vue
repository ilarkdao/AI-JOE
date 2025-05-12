<template>
  <div class="subContainer">
		<div id="app2">
			<div id="chat_container"></div>  

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

			<form>
				<textarea name="prompt" rows="2" cols="1" placeholder="请输入你的问题..." :disabled='clickFlag'></textarea>
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
  title:"AI·Joe，辅助工作流"
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

let clickFlag = ref(false)
let prompt = ref('')
let history = []
let round = 1
const submit = async(e) => {	
  e.preventDefault()
  if(!token.value){
    message.error("您尚未登录， 呜呜~~", { duration: 5e3 })
    return
  }

  let model = ModelRef.value.defaultModel
  // console.log(122, "model", model) 
  //更新model 如果与前值不同，就重新赋值
  let setModel = localStorage.getItem(llms)
  if(model != setModel){
    localStorage.setItem(llms, model)
    // console.log(899, "set model", model)
  }
  
  let form = document.querySelector('form')
  let chatContainer = document.querySelector('#chat_container')
  
  let data = new FormData(form)
  let ask = data.get('prompt')

  if(ask == ''){
    message.error("文本不能为空！", { duration: 5e3 })
    return
  }
  // 先判断是不是中文 ，如果中文长度过长，则截取最后两轮
  if(round > 1){
    let str = JSON.stringify(history)
    let isChinese = /.*[\u4e00-\u9fa5]+.*$/.test(ask) 
    // console.log(256, "isChinese", isChinese, ask)
    if(isChinese && str.length > max_zh_length){
      history = history.slice(-4)
    }
    if(!isChinese && str.length > max_en_length){
      history = history.slice(-4)
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

  // to focus scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight
      
  history.push({role: "user", content: ask})
  // console.log(5668, "history", history)
  let dataObj = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.value
      },
      body: JSON.stringify({
          model: model,
          query: history,
          temperature: 0.2
      })
  }

  const response = await fetch(baseURL+'/streaming', dataObj)
  messageDiv.innerHTML = " "
  if (response.ok) {	
      let i = 0
      let getStream = function (reader) {
          return reader.read().then(function (result) {
            // 如果数据已经读取完毕，直接返回
            if (result.done) {
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
              text = text.replace(/\\n/g,'<br/>')  //替换换行符
            }
            text = text.replace(/\*/g,'')  //去除 *
            text = text.replace(/\#/g,'')  //去除 #
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
      clearInterval(loadInterval)  
      loading.textContent = ''
      messageDiv.innerHTML = "Something went wrong"
      message.error("错误！\n"+err, { duration: 5e3 })
  }
      
}

</script>