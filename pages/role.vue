<template>
  <div class="subContainer"> 
    <div id="appcode"> 
      <!-- 角色 -->
      <div flex mb-2 items-center > 
        <div w-25 flex items-center>
          <p mr-2>预订角色 </p> 
          <n-popover trigger="hover" >
            <template #trigger>
              <div class="i-mdi-alpha-i-circle" hidden lg:flex/>
            </template>
            <span>将AI代入角色以期得到更为精准的结果</span>
          </n-popover>
        </div>
        <Roles ref="RoleRef"></Roles> 
      </div>       
      <n-input
        v-model:value="prompt"
        type="textarea"
        rows=2
        placeholder="请输入主题或指令......"
      />
      <div text-center mt-2 pb-2>
        <n-button block mr-2 type="primary" @click="submit" :loading = "clickFlag">
          提交
        </n-button>
      </div>

      <div mt-2 mb-2 v-if="noteFlag">
				注： 可以稍微释放Joe的能力，让它干些更有创意更为专业的工作，比如让它写个短篇小说，剧本，策划书，诗歌...... 可能会有惊喜哦！ <br>
				先选择角色：写作高手，再这样输入：<span font-italic>以末日小强为主题，创作一篇短篇小说。</span>  <br> 
				或者 先选择角色：营销专家，再这样输入： <span font-italic>以岳州窑销售为主题写一份营销策划。</span>
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
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')
useHead({
  title:"角色"
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
// 切换角色 
let RoleRef = ref(null)

const clickFlag = ref(false)
const prompt = ref('')
const noteFlag = ref(true)

const submit = async(e) => {	
  e.preventDefault()
  if(!token.value){
    message.error("您尚未登录， 呜呜~~", { duration: 5e3 })
    return
  }
  let role = RoleRef.value.defaultRole
  // console.log(122, "role", role) 
  
  //设置或更新 如果是空值 或是与前值不同，都重新赋值
  let latest = localStorage.getItem("defaultRole")
  if(latest == null || role != latest){
    localStorage.setItem('defaultRole', role)
    // console.log(899, "set lastname")
  }

  noteFlag.value = false
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
      
  let query = [{role: "user", content: role+prompt.value}]
  // console.log(899, "query", query)
  // return
  let dataObj = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.value
      },
      body: JSON.stringify({
          query: query,
          temperature: 0.6
      })
  }

  //to clear the textarea input 
  prompt.value = ''
  const response = await fetch(baseURL+'/gptstreaming', dataObj)
  // console.log(456, "response", response)

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

</script>