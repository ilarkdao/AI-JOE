<template>
<div class="subContainer" mt-6>
  <strong>简介</strong>
  <p>AI·Joe，随手可用的智能助手，如影似人。它是基于多个语言模型和开发框架，
  比如：Openai API、Claude v2、Meta Llama、Stable Diffusion、LangChain等。致力于打造优秀的人工智能助手和自动化的工作流程。
  它开箱即用，对具体的应用场景和参数都做了调优。
  在不断升级的过程中，将迎来更加智能化的未来！
  </p> 

 <strong>大语言模型</strong>
 <p>1. GPT-3.5 Turbo</p>
 <p>GPT-3.5-Turbo是由Openai推出的一种自然语言处理（NLP）模型。它表现非常出色，可以生成高质量的文本，其生成的文本的质量接近于人类写作。同时，在处理问答任务中，GPT-3.5-Turbo的语言理解能力也非常出色，可以理解和回答各种类型的问题。</p>

 <p>2. GPT-4</p>
 <p>GPT-4被认为是已知最强的语言模型，其智力和推理能力与优秀的本科本相当。但是另一方面，它的费用很贵，非常贵，费用是GPT 3.5的30倍。</p>

 <p>3. Claude v2</p>
 <p>Anthropic 公司开发，功能和GPT类似，被认为是GPT的强力竞争者。</p>

 <p>4. Code Llama Instruct</p>
 <p>Meta AI 发布的 Code Llama ，这是一个可以使用文本提示生成代码的大型语言模型 (LLM)。 Code Llama 是针对代码任务的公开LLM的最先进技术，有可能使当前开发人员的工作流程更快、更高效，并降低学习编码人员的进入门槛。 但是目前对中文的支持不太好，容易出现乱码。 </p>

 <strong>积分制度</strong>
 <p> AI·Joe的消耗都用积分进行计算，采用预付费机制，用多少花多少。每个新用户都会赠送800积分的体验分，用完即需充值。具体参看
   <nuxt-link to="/user/price"  text-gray-700>
        价格表
   </nuxt-link>
 </p>

 <strong>上下文语境</strong>
 <p> 上下文语境是指在每次访问 AI 时都把以前的对话记录都提交上去, AI就会读取上传的内容, 以此形成上下文语境。
  这样做的好处是优化了用户体验和增强了交互性。但缺点是重复的提交会造成一定的资源浪费！ <br>
  AI·Joe在功能中都使用了上下文功能。
 </p>

 <strong>响应式设计</strong>
 <p> 电脑端和手机端都做了适配，打开即用！ </p>
 
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