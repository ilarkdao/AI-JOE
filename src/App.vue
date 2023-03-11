<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" variant="info" id="navmanu">
      <b-navbar-brand @click="backtoindex" class="align-top" style="display: flex;align-items: center;">
          <img src="../static/images/logo.svg" class="d-inline-block" alt="lark">
					<span style="margin-left:0.5rem;">AI·Joe</span>
      </b-navbar-brand>
      <br>     
      </b-collapse>

		  <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			<b-collapse id="nav-collapse" is-nav>
					<!-- Right aligned nav items -->
					<b-navbar-nav class="ml-auto">
						<router-link to="/">ChatGPT</router-link> 
						<router-link to="/war">俄乌"砖家"</router-link> 
						<router-link to="/translate">翻译</router-link> 
						<router-link to="/code">编程</router-link> 
						<router-link to="/explaincode">解释代码</router-link>  
						<router-link to="/interview">模拟面试</router-link>  
						<router-link to="/continue">续写</router-link>   
						<!-- <router-link to="/abstract">摘要</router-link>  -->
						<router-link to="/words">祝词</router-link>
						<router-link to="/image">图像</router-link>
						<router-link to="/advanced">高级</router-link>  
						<router-link to="/contact">联系</router-link> 
					</b-navbar-nav>
				</b-collapse>
		 </b-navbar>

    <router-view/>

  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {


      }
    },
    methods: {
      backtoindex(){
        this.$router.push({path: '/'})
      },
			
    },
    components: {

    },

    mounted() {


    },

  }
</script>

<style>
  html,body{
    height: 100%;
  }
  #app{
    /* position:relative; */
    width:100%;
    min-height:100%;
    /* padding-bottom: 5rem; */
    /*padding-bottom: 7rem;*/
    box-sizing: border-box;
    /* background-position: 0px -30vh; */
    /* background-repeat: no-repeat; */
    /* background-color: red; */
  }


  .account-icon{
    width: 20px;
    height: 20px;
    margin-right: 5px;
    padding-right: 2px;
  }

  .module{
    font-size: 1.1rem;
  }

  .module-title{
    margin-right: 0.8rem;

  }

  .module-title:hover{
    color: darkcyan;
    cursor: pointer;
  }
  .module-disable{
    margin-right: 0.8rem;
    color: rgba(28,25,34,0.49);
  }

  .drop{
    /*background-color: aquamarine;*/
    /*margin-top: 1rem;*/
    position:relative;
    z-index: 2000;
  }


  .btn-secondary{
    /*background-color: white !important;*/
    border: 0px;
  }

  .router-link-exact-active{
    color: gray!important;
    border-bottom: 1px solid azure;
    text-align: center;
  }

  .logo{
    cursor: pointer;
  }

  .loginfo{
    margin-top: 1.2rem;
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    background-color: rgba(0,0,0,0);
    border-radius: 12px;
    white-space: nowrap;
    width: 100%;
  }
 

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  #navmanu {
    background-color: white !important;
    padding-left: 15rem;
  }
  .align-top{
    /* margin-left: 3rem; */
		text-align: center;
		/* background-color: aqua; */
		display:flex;
		flex-direction: row;
  }

  #nav-collapse{
     margin-right: 20rem;
    /*background-color: blueviolet;*/
  }
  #nav-collapse a{
    color: gray;
		/* color: darkcyan; */
    /* margin-right: 0.4rem; */
    margin-left: 0.8rem;
		border-radius: 0.4rem;
		
  }
  #nav-collapse a:hover{
    color: darkcyan;
    text-decoration: none;
  }
  #notice {
    padding: 1rem 5rem;
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
	    margin-top: -20vh;
	 }
	
	 .mask-info{
	   display: flex;
	   align-content: center;
	 }
	
	 .mask-info-text{
	   text-align: center;
	   width: 100%;
	 }



  .active{
    color:rgb(158, 10, 10);
    /*border-bottom: 1px solid red;*/
    font-size: 1.2rem;
    padding-bottom: 0.3rem;
    /*border-bottom: 2px solid red;*/
    /*border-radius: 0.6rem;*/
  }
  .noActive{

  }
	
	.router-link-exact-active{
	    color: darkcyan !important;
	    border-bottom: 1px solid darkcyan;
	    text-align: center;
	  }
	
	  @media only screen and (max-width:768px) {
	    .navmanu{
	      margin-left: 1rem;
	      margin-right: 1rem;
	    }
			#navmanu {
			  background-color: white !important;
			  padding-left: 1rem;
			}
			#nav-collapse{
			   margin-right: 1rem;
			   /* background-color: blueviolet; */
			}
			.container{
			  width: 85%;
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
