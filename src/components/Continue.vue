<template>
  <div class="container">
    <div  class="exchange">
        <!-- 上面的框   -->
        <div class="round-box" v-if="clickFlag">		
					<div class="round-box-content-container" style="margin-top: -0.5rem;">	
						<b-form-textarea
							v-model="prompt"
							placeholder="请输入原始文本, 不宜超过500字"
							rows="6"
							max-rows="6"
						></b-form-textarea>		
					</div>
        </div>
				<b-button  block pill variant="outline-primary" @click="clickWords" v-if="clickFlag">续写开始</b-button>
				
				<div v-if="!clickFlag">
					<div style="margin-top: -1rem;margin-bottom: 1rem;">
						<span style="font-style: italic;">{{prompt}}</span>
					</div>
					<div v-if="answer">
						<div class="wordText">{{answer}}</div>
						 <b-button variant="link" @click="copy" style="font-size: 0.8rem;margin-right: 0.3rem;">复制</b-button>
						 <b-button variant="link" @click="more" style="font-size: 0.8rem;">再来一次</b-button>
					  </div>
					
        </div>

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
  export default {
    text: "Continue",
    data() {
      return {
        isLoading: true,
        showMask: false,
        maskInfo:'',
		
				clickFlag: true,
				prompt: '',
				answer: '',


      }
    },
    methods: {
			async clickWords(){
				//生成福兔
				this.clickFlag = false
			  try {
					if(this.prompt == ''){
						this.showMask = true
						this.successFlag = false
						this.maskInfo = "文本不能为空！\n"
						return	
					}
					this.isLoading = true
					let words = this.prompt
					let tail = '\n\n 请按照以上风格续写'
					let prompt = words.length > 500 ? words.substring(0,500)+tail : words+tail
					// let prompt = this.prompt+'\n\n 请按照以上风格续写'
					// console.log(699, prompt)
					this.axios.request({
							method: 'post',
							url: this.api+'/advanced',
							data:{
								prompt: prompt,
								temperature:0.5
							}
						})
						.then(arg => {
							this.isLoading = false
							// console.log(699, arg.data)
							this.answer = arg.data.bot
							
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
        this.showMask = false
				this.clickFlag = true
      }

    },

    components: {
      SmallLoading,
    },

		mounted() {
			this.isLoading = false

		},

    

    }
</script>

<style scoped>

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
	border: 1px solid gainsboro;
	padding:8px 14px;
	margin-bottom: 1rem;
}
textarea {
	width: 100%;
	color: darkgrey;
	padding: 5px;
	background: transparent;
	border: none;
	outline: none;
	
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
	@media only screen and (max-width:768px) {
		.container{
		  width: 98%;
		  margin: 1rem auto;
		  padding: 1.5rem 1rem 2rem 1rem;
		  background-color: transparent;
		  box-shadow: none;
		  border-radius: 0px;
		  display: block;
		  z-index: 1;
		}
		 
	}
</style>

