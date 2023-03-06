<template>
  <div class="containerX">

							<!-- <div class="wordText">{{happyWord}}</div> -->
					
					    <div id="app2">
								<div id="chat_container"></div>
					
								<form>
									<textarea name="prompt" rows="1" cols="1" placeholder="Ask codex..."></textarea>
									<button @click="submit"><img src="../assets/send.svg" alt="send" /></button>
								</form>
							</div>
				


				
				<!-- <b-button  block pill variant="outline-primary" @click="sliceQuery" v-if="clickFlag">提交</b-button> -->
				
				
  

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
    text: "Index",
    data() {
      return {
        isLoading: true,
        showMask: false,
        maskInfo:'',

		    happyWord: '',
				clickFlag: true,
				query: [],


      }
    },
    methods: {
			loader(element) {
			    element.textContent = ''
					let loadInterval			
			    loadInterval = setInterval(() => {
			        // Update the text content of the loading indicator
			        element.textContent += '.';
			
			        // If the loading indicator has reached three dots, reset it
			        if (element.textContent === '....') {
			            element.textContent = '';
			        }
			    }, 300)
					
			},
			typeText(element, text) {
			    let index = 0
			
			    let interval = setInterval(() => {
			        if (index < text.length) {
			            element.innerHTML += text.charAt(index)
			            index++
			        } else {
			            clearInterval(interval)
			        }
			    }, 20)
			},
			// generate unique ID for each message div of bot
			// necessary for typing text effect for that specific reply
			// without unique ID, typing text will work on every element
			generateUniqueId() {
			    const timestamp = Date.now();
			    const randomNumber = Math.random();
			    const hexadecimalString = randomNumber.toString(16);
			
			    return `id-${timestamp}-${hexadecimalString}`;
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
			sliceQuery(){
				let query = this.query
				console.log(566,"query.length", query.length,"JSON.stringify(query).length" ,JSON.stringify(query).length)
				console.log(668, query.length > 30 || JSON.stringify(query).length > 800)
				//检查query, 太长（超过30条，或是1500字）则切短
				if(query.length > 30 || JSON.stringify(query).length > 800){
					if(query.length <= 5){
						query = query.slice(3) 
					}else{
						query = query.slice(5) 
					}
					
					if(query.length > 30 || JSON.stringify(query).length > 800){
						this.sliceQuery()
					}
					console.log(23, query, query.length)
					return query
				}
				return query
			},
			async submit2(e){
				e.preventDefault()
				let form = document.querySelector('form')
				let chatContainer = document.querySelector('#chat_container')
				
				let data = new FormData(form)
				// console.log(133, "submit", data)
				// console.log(135, chatContainer.innerHTML)
				
				// user's chatstripe
				chatContainer.innerHTML += this.chatStripe(false, data.get('prompt'))
				// console.log(138 ,"ss", chatContainer.innerHTML)
				
				// // to clear the textarea input 
				form.reset()
				
				// // bot's chatstripe
				const uniqueId = this.generateUniqueId()
				chatContainer.innerHTML += this.chatStripe(true, " ", uniqueId)
				
				// to focus scroll to the bottom
				chatContainer.scrollTop = chatContainer.scrollHeight;
				
				// specific message div
				const messageDiv = document.getElementById(uniqueId)
				
				// messageDiv.innerHTML = "..."
				// this.loader(messageDiv)
				messageDiv.textContent = ''		
				let loadInterval = setInterval(() => {
				    // Update the text content of the loading indicator
				    messageDiv.textContent += '.';
							
				    // If the loading indicator has reached three dots, reset it
				    if (messageDiv.textContent === '....') {
				        messageDiv.textContent = '';
				    }
				}, 300)
				
				// let api = "http://43.154.196.227:6200/gpt"
				const response = await fetch('http://43.154.196.227:6200/word', {
				    method: 'POST',
				    headers: {
				        'Content-Type': 'application/json',
				    },
				    body: JSON.stringify({
				        prompt: data.get('prompt')
				    })
				})
				
				clearInterval(loadInterval)
				messageDiv.innerHTML = " "
				
				if (response.ok) {
				    const data = await response.json()
				    const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 
						console.log(165, parsedData)
				
				    this.typeText(messageDiv, parsedData)
				} else {
				    const err = await response.text()
				
				    messageDiv.innerHTML = "Something went wrong"
				    alert(err)
				}
						
			},
			async sleep(){
			  return new Promise(resolve => {
			      // console.log(1, "start")
			      setTimeout(resolve, 5000)  //5秒
			      // console.log(2, "end")
			  })
			},
			
			async submit(e){
				//检查query, 太长（超过30条，或是超1500字）则切短
				let query = this.sliceQuery()
				
				e.preventDefault()
				let form = document.querySelector('form')
				let chatContainer = document.querySelector('#chat_container')
				
				let data = new FormData(form)
				// console.log(133, "submit", data)
				// console.log(135, chatContainer.innerHTML)
				
				// user's chatstripe
				chatContainer.innerHTML += this.chatStripe(false, data.get('prompt'))
				// console.log(138 ,"ss", chatContainer.innerHTML)
				
				// // to clear the textarea input 
				form.reset()
				
				// // bot's chatstripe
				const uniqueId = this.generateUniqueId()
				chatContainer.innerHTML += this.chatStripe(true, " ", uniqueId)
				
				// to focus scroll to the bottom
				chatContainer.scrollTop = chatContainer.scrollHeight;
				
				// specific message div
				const messageDiv = document.getElementById(uniqueId)
				
				// messageDiv.innerHTML = "..."
				// this.loader(messageDiv)
				messageDiv.textContent = ''		
				let loadInterval = setInterval(() => {
				    // Update the text content of the loading indicator
				    messageDiv.textContent += '...';
							
				    // If the loading indicator has reached three dots, reset it
				    if (messageDiv.textContent === '....') {
				        messageDiv.textContent = '';
				    }
				}, 300)
				
				
				let newArr = {role: "user", content: data.get('prompt')}
				query.push(newArr)
				console.log(111, query)
				// await this.sleep()
				
				// let api = "http://43.154.196.227:6200/gpt"
				const response = await fetch('http://43.154.196.227:6200/gpt', {
				    method: 'POST',
				    headers: {
				        'Content-Type': 'application/json',
				    },
				    body: JSON.stringify({
				        query: JSON.stringify(query),
								temperature: 0.2
				    })
				})
				
				clearInterval(loadInterval)
				messageDiv.innerHTML = " "
				
				// let response = {
				// 	ok: true,
				// 	data: " 此类病毒在发病和传播方面主要表现为病毒通过飞沫、接触传播，尤其容易通过吸入飞沫、近距离接触，以及接触物体表面后接触眼、鼻、口等传播。病毒可以由患者的咳嗽、打喷嚏等排出，并形成细小的气溶胶粒子，这些细小的气溶胶粒子可以四处飘散出去，形成空气传播，其中还包括贴近患者表面的物体，如一些床单、枕头、交通工具等表面因人们接触接触而可能大量传播出病毒，对其他人也可能造成感染。"
				// }
				
				if (response.ok) {
				    const data = await response.json()
						console.log(689, data)
						const parsedData = data.message.content.trim() // trims any trailing spaces/'\n' 
				    this.typeText(messageDiv, parsedData)
						
						//组织新的query
						let newX = {role: "assistant", content: parsedData}
						query.push(newX)
						this.query = query
						console.log(998, query)
						
				} else {
				    const err = await response.text()
				    messageDiv.innerHTML = "Something went wrong"
				    alert(err)
				}
						
			},
		  async clickWords(){
				//prompt generator
		 				this.clickFlag = false
		 			  try {
		 					if(this.prompt == ''){
		 						this.showMask = true
		 						this.successFlag = false
		 						this.maskInfo = "文本不能为空！\n"
		 						return	
		 					}
		 					this.isLoading = true  
		 					//https://api.ilark.io/word  
		 					//url: this.api+'/word',
		 					//http://localhost:6200    
		 					this.axios.request({
		 							method: 'post',
		 							url: this.api+'/generator',
		 							data:{
		 								prompt: this.prompt
		 							}
		 						})
		 						.then(arg => {
		 							this.isLoading = false
		 							// console.log(699, JSON.parse(arg.request.response).choices[0].message.content)
		 							console.log(699, arg)
		 							// this.answer = arg.data.message
									this.answer = arg.data.message
		 							
		 						})
		 						.catch(error => {
		 							this.showMask = true
		 							this.isLoading = false
		 							this.successFlag = false
		 							this.maskInfo = "错误！\n" + error
		 						})
		 			  }catch(e){
		 						this.showMask = true
		 						this.isLoading = false
		 						this.successFlag = false
		 						this.maskInfo = "错误！\n" + e
		 			    } 
		 },
		 copy(){
		 	navigator.clipboard.writeText(this.answer)
		 },
		 more(){
			 this.clickFlag = true
			 this.prompt = ''
			 this.answer = ''
		  }, 
		 
      hideMask(){
        this.showMask=false
				this.clickFlag = true
      }

    },

    components: {
      SmallLoading,
    },
		
		computed: {
			prop () {
				let data = {
					subfield: false,
					defaultOpen: 'preview',
					editable: false,
					toolbarsFlag: false,
					scrollStyle: true
				}
				return data
			}
		},

		mounted() {
			this.isLoading = false
			this.query = [
				{role: "system", "content": "You are a helpful assistant."}
			]

		},

    

    }
</script>

<style scoped>
	@import url("../../static/style.css");
  .container{
    width: 45%;
    max-width: 620px;
    min-width: 400px;
    margin: 2.5rem auto;
    padding: 1.5rem 1rem 2rem 1rem;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 30px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 3px 16px 24px, rgba(0, 0, 0, 0.01) 3px 24px 32px;
    border-radius: 30px;
    display: block;
    z-index: 1;
    box-sizing: border-box;
  }
.changebox{
  display: flex;
  justify-content: space-evenly;
  padding: 1em;
}

.changebox p{
  font-weight: 400;
  color: darkgray;
  font-size: 1.2rem;
  cursor: pointer;
}

.titleSelected{
color: rgb(30, 30, 30) !important;
font-weight: 500 !important;
}

.titleUnSelected{
color: darkgray !important;
font-weight: 400 !important;
}

.changebox p:hover{
  color: rgb(92, 91, 91) !important;
}

  .user{
    margin-top: 1rem;
    width: 30rem;
  }


.round-box{
      border-radius: 20px;
      border: 1px solid rgb(247, 248, 250);
      padding:8px 14px;
      margin-bottom: 1rem;
}

.round-box-title-container{
     display: flex;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(0, 0, 0);
    font-size: 0.75rem;
    line-height: 1rem;;
    box-sizing: border-box;
    justify-content: space-between;
    -webkit-box-pack: justify;
    height: 100%;
}
.round-box-content-container{
    display: flex;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(0, 0, 0);
    font-size: 1rem;
    line-height: 1.2rem;;
    box-sizing: border-box;
    padding-top: 14px;
    justify-content: space-between;
    -webkit-box-pack: justify;
    height: 100%;
}

.box-title{
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 500;
    font-size: 14px;
    color: rgb(86, 90, 105);
}

.input{
  color: rgb(0, 0, 0);
    width: 100%;
    position: relative;
    font-weight: 500;
    outline: none;
    border: none;
    flex: 1 1 auto;
    background-color: rgb(255, 255, 255);
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px;
    appearance: textfield;
}


  .confirm-box{
    margin-top: 1em;
    display: flex;
    justify-content: space-around;
  }

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
</style>

