<template>
  <div class="container">
    <div  class="exchange">
					<div style="margin-top: -1rem;margin-bottom: 1rem;">
						  <div class="wordText">
							<p><strong>简介</strong> <br>
								AI·Joe，人工智能助手是基于OpenAI Api开发，对具体的应用场景和参数都做了调优。
							 </p> 
							 
							 <p><strong>官网</strong> <br>
								 <a target="_blank" href="https://ilark.io">https://ilark.io</a>
								</p> 
								
								<p><strong>Github</strong> <br>
									<a target="_blank" href="https://github.com/ilarkdao">https://github.com/ilarkdao</a>
								 </p>  
								 
								 <p><strong>Discord</strong> <br>
								   <a target="_blank" href="https://discord.gg/p9KTdmVrfb">https://discord.gg/p9KTdmVrfb</a>
								  </p> 
								 
						    <p><strong>Medium</strong> <br>
								 <a target="_blank" href="https://medium.com/@ilark_dao">https://medium.com/@ilark_dao</a>
						    </p>
						
						    <p><strong>twitter</strong> <br>
									<a target="_blank" href="https://twitter.com/ilark_dao">@ilark_dao</a>
						    </p>
								
								<p><strong>Gmail</strong> <br>
								  larkio2021@gmail.com
								 </p>
						
						    </div>
						
					</div>
					<div >					
        </div>

    </div>

  </div>
</template>

<script>
  export default {
    text: "Contact",
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
					let prompt = '`'+this.prompt+'`，'+'请按照以上风格续写'
					console.log(699, prompt)
					this.axios.request({
							method: 'post',
							url: 'https://api.ilark.io/word',
							data:{
								prompt: prompt
							}
						})
						.then(arg => {
							this.isLoading = false
							console.log(688, arg)
							console.log(699, arg.data)
							this.answer = arg.data.bot
							
						})
						.catch(error => {
							this.showMask = true
							this.successFlag = false
							this.prompt = ''
							this.maskInfo = "错误！\n" + error
						})
			  }catch(e){
						this.showMask = true
						this.successFlag = false
						this.prompt = ''
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
      },
			async waiting(){
				return new Promise(resolve => {
					setTimeout(resolve, 2000)  //2秒
				})
			},

    },


		mounted() {
			

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
	  /* background-color: floralwhite; */
		padding:0.7rem;
		padding-left: 1.5rem;
	}
</style>

