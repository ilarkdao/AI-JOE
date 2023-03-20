<template>
  <div class="containerX">
		<div id="app2">
			<button @click="flapRestriction"><div id="chat_container2" v-if="restrictionFlag">
			   免费版每次输入的长度不宜超过70字, 且无法记住上下文！</div>
			</button>
			
			<div id="chat_container"></div> 
			
			<!-- <div id="loadingTs"></div> -->
		  
			<form>
				<textarea name="prompt" rows="1" cols="1" placeholder="和我聊聊吧..." :disabled='clickFlag'></textarea>
				<button @click="submit" :disabled='clickFlag'><img src="../assets/send.svg" alt="send" /></button>		
			</form>
		</div>

    <!--加载动画-->
    <transition name="fade">
      <SmallLoading v-if="isLoading"></SmallLoading>
    </transition>
     <!-- 错误提示弹窗 -->
    <transition name="fade">
      <div class="mask" v-if="showMask" @click="hideMask">
        <div class="mask-box">
          <div class="mask-info">
            <div class="mask-info-text">
              <div v-if="successFlag">
                <img src="../../static/images/success.jpg" class="d-inline-block align-top" alt="success">
              </div>
              <div v-else>
                <img src="../../static/images/error.jpg" class="d-inline-block align-top" alt="error">
              </div>
              {{ maskInfo }}<br>
            </div>
          </div>
        </div>
      </div>
    </transition>
		
  </div>
</template>

<script>
  import SmallLoading from './SmallLoading'
	import bot from '../assets/bot.svg'
	import user from '../assets/user.svg'
  export default {
    text: "Chatgpt",
    data() {
      return {
        isLoading: true,
        showMask: false,
        maskInfo:'',
				clickFlag: false,
				restrictionFlag: '',
				text: ''

      }
    },
    methods: {
			// generate unique ID for each message div of bot
			// necessary for typing text effect for that specific reply
			// without unique ID, typing text will work on every element
			generateUniqueId() {
			    const timestamp = Date.now();
			    const randomNumber = Math.random();
			    const hexadecimalString = randomNumber.toString(16);
			
			    return `id-${timestamp}-${hexadecimalString}`;
			},
			loadingStripe(uniqueId) {
			    return (
			        `<span style='font-size: 20px;color: #dcdcdc;' id=${uniqueId}></span>`
			    )
			},
			chatStripe(isAi, value, uniqueId) {
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
			},
		  async sleep(){
		    return new Promise(resolve => {
		        // console.log(1, "start")
		        setTimeout(resolve, 5000)  //3秒
		        // console.log(2, "end")
		    })
		  },
			utf8ArrayToStr(array) {
			  let out, i, len, c
			  let char2, char3
			  out = ""
			  len = array.length
			  i = 0
			  while(i < len) {
					c = array[i++]
					switch(c >> 4)
					{
							case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
							// 0xxxxxxx
							out += String.fromCharCode(c)
							break
							case 12: case 13:
							// 110x xxxx   10xx xxxx
							char2 = array[i++]
							out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F))
							break
							case 14:
									// 1110 xxxx  10xx xxxx  10xx xxxx
									char2 = array[i++];
									char3 = array[i++];
									out += String.fromCharCode(((c & 0x0F) << 12) |
											((char2 & 0x3F) << 6) |
											((char3 & 0x3F) << 0))
									break
					}
			  }
			  return out
			},
			flapRestriction(){
				this.restrictionFlag =  false
				localStorage.setItem('restrictions', "true")
			},
			async submit(e){	
				e.preventDefault()
				let form = document.querySelector('form')
				let chatContainer = document.querySelector('#chat_container')
				
				let data = new FormData(form)
				this.clickFlag = true
				
				// console.log(133, "submit", data)
				if(data.get('prompt') == ''){
					this.showMask = true
					this.successFlag = false
					this.maskInfo = "文本不能为空！\n"
					return	
				}
				
				// user's chatstripe
				chatContainer.innerHTML += this.chatStripe(false, data.get('prompt'))
				
				//to clear the textarea input 
				form.reset()
				
				//bot's chatstripe
				const uniqueId = this.generateUniqueId()
				chatContainer.innerHTML += this.chatStripe(true, " ", uniqueId)
				
				//loading
				const uniqueIdX = this.generateUniqueId()
				chatContainer.innerHTML += this.loadingStripe(uniqueIdX)
				
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
						
				let query = [{role: "user", content: data.get('prompt')}]
				let dataObj = {
				    method: 'POST',
				    headers: {
				        'Content-Type': 'application/json',
				    },
				    body: JSON.stringify({
				        query: query,
						})
				}
				// console.log(111, query)
				// await this.sleep()

				const response = await fetch(this.api+'/gptstreaming', dataObj)
				let that = this
				messageDiv.innerHTML = " "
				if (response.ok) {	
					  let i = 0
						let getStream = function (reader) {
								return reader.read().then(function (result) {
									// 如果数据已经读取完毕，直接返回
									if (result.done) {
										console.log(889, "result done")
										that.clickFlag = false
										clearInterval(loadInterval)  
										loading.textContent = ''
										return
									}
									// 取出本段数据（二进制格式）
									let chunk = result.value
									// console.log(1267, chunk, typeof chunk)  //unit8array object
									let text = that.utf8ArrayToStr(chunk)
									if(i === 0){
										text = text.replace(/\\n/g,'')  //去除首段换行
									} else{
										text = text.replace(/\\n/g,'<br/>')
									}
									// console.log(5667, "i", i, text)
									// 将本段数据追加到网页之中
									messageDiv.innerHTML += text
									// messageDiv.textContent += text
									i ++
									// 递归处理下一段数据
									return getStream(reader)
								})
						}
						getStream(response.body.getReader())
						
				} else {
				    const err = await response.text()
				    messageDiv.innerHTML = "Something went wrong"
						this.showMask = true
						this.successFlag = false
						this.maskInfo = "错误！\n" + err
				}
						
			},
			
			async submit_text(e){
				e.preventDefault()
				let form = document.querySelector('form')
				let chatContainer = document.querySelector('#chat_container')
				
				let data = new FormData(form)
				// this.clickFlag = true
								
				// user's chatstripe
				chatContainer.innerHTML += this.chatStripe(false, data.get('prompt'))
				
				//to clear the textarea input 
				form.reset()
				
				//bot's chatstripe
				const uniqueId = this.generateUniqueId()
				chatContainer.innerHTML += this.chatStripe(true, " ", uniqueId)
				
				//loading
				const uniqueIdX = this.generateUniqueId()
				chatContainer.innerHTML += this.loadingStripe(uniqueIdX)
				
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
						

				// console.log(111, query)
				// await this.sleep()
			
				// const response = await fetch(this.api+'/gptstreaming', dataObj)
				let that = this
				messageDiv.innerHTML = " "
				if (true) {	
					  let i = 0
						messageDiv.innerHTML += this.text
						await this.sleep()
						await this.sleep()
						
						clearInterval(loadInterval)
						loading.textContent = ''
						
				} else {
				    const err = await response.text()
				    messageDiv.innerHTML = "Something went wrong"
						this.showMask = true
						this.successFlag = false
						this.maskInfo = "错误！\n" + err
				}
						
			},
		  
		 copy(){
		 	navigator.clipboard.writeText(this.answer)
		 },
	 
      hideMask(){
        this.showMask = false
				this.clickFlag = false
      }

    },

    components: {
      SmallLoading,
    },

		mounted() {
			this.isLoading = false
			
			//初始化限制
			if(localStorage.getItem("restrictions") == null){
				this.restrictionFlag = true
			}else{
				this.restrictionFlag = false
			}
			
		
		},

    

    }
</script>

<style scoped>
	@import url("../../static/style.css");
  .mask{
    z-index: 2000;
    overflow: hidden;
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
}

 .mask-box{
    position: relative;
		max-width: 280px;
    width: 100%;
    background: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 30px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 3px 16px 24px, rgba(0, 0, 0, 0.01) 3px 24px 32px;
    border-radius: 10px;
    padding: 1rem;
    display: block;
    z-index: 100;
    box-sizing: border-box;
    margin-top: -50vh;
 }

 .mask-info{
   display: flex;
   align-content: center;
 }

 .mask-info-text{
   text-align: center;
   width: 100%;
 }

  .exchange{
    /* width: 30rem; */
    margin-top: 1rem;
  }

  .isok{
    /*margin-top: 1.5rem;*/
    /*width: 50%;*/
    /*background-color: chartreuse;*/
  }
  .isfalse{
    /*margin-top: 1.5rem;*/
    /*width: 50%;*/
    background-color: crimson;
  }
	.wordText{
	  background-color: floralwhite;
		padding:0.7rem;
	}
  #loadingTs{
	 background-color: beige;
	 display: block;
   text-align: center;
	 font-size: 20px;
	 color: beige;
	 margin-bottom: 6px;
  }

</style>

