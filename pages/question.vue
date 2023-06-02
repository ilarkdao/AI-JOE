<template>
<div class="subContainer" mt-6>
  <strong>简介</strong>
  <p>AI·Joe，随手可用的智能助手，如影似人。它是基于多个语言模型和开发框架，
  比如：Openai API、Stable Diffusion、LangChain等。致力于打造优秀的人
  工智能助手和自动化的工作流程。它开箱即用，对具体的应用场景和参数都做了调优。
  在不断升级的过程中，将迎来更加智能化的未来！
  </p> 

 <strong>积分制度</strong>
 <p> AI·Joe的消耗都用积分进行计算，采用预付费机制，用多少花多少。每个新用户都会赠送800积分的体验分，用完即需充值。具体参看
   <nuxt-link to="/user/price"  text-gray-700>
        价格表
   </nuxt-link>
 </p>

 <strong>上下文语境</strong>
 <p> 上下文语境是指在每次访问GPT时都把以前的对话记录都提交上去, AI就会读取上传的内容, 以此形成上下文语境。这样做的好处是
优化了用户体验和增强了交互性。但缺点是重复的提交会造成资源的极大浪费！权衡利弊， AI·Joe只是在“问道”中使用了上下文
  功能，其它的均没有。
 </p>
 
 <strong>联系</strong>
 <p>官网:  <a target="_blank" href="https://ilark.io">https://ilark.io</a></p> 
 <p>Github: <a target="_blank" href="https://github.com/ilarkdao">https://github.com/ilarkdao</a></p>  
 <p>Discord:  <a target="_blank" href="https://discord.gg/p9KTdmVrfb">https://discord.gg/p9KTdmVrfb</a></p> 
 <p>Medium:  <a target="_blank" href="https://medium.com/@ilark_dao">https://medium.com/@ilark_dao</a></p>
 <p>twitter: <a target="_blank" href="https://twitter.com/ilark_dao">@ilark_dao</a></p>
 <p>Gmail:  larkio2021@gmail.com  </p>

</div>
</template>
<script setup>
useHead({
  title:"简介"
})
</script>

<style>
 a { 
  text-decoration:none;
  @apply text-gray-700;
 } 
 a :hover{ 
  text-decoration:none;
  @apply text-blue;
 } 
</style>