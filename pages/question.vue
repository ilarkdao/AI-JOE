<template>
<div class="subContainer" mt-6>
  <strong>简介</strong>
  <p>AI·Joe，人工智能助手，辅助工作流。它是基于多个语言模型和开发框架，
  比如：Openai API、Google Gemini、Google PaLM2 Chat、Meta Llama、Yi 34B Chat、
  Midjourney、Stable Diffusion、LangChain等。致力于打造优秀的人工智能助手和自动化的工作流程。
  它开箱即用，对具体的应用场景和参数都做了调优。
  在不断升级的过程中，将迎来更加智能化的未来！
  </p> 
   <p><a target="_blank" href="https://doc.ilark.io" text-orange-900>-> 查看文档 </a></p> 

 <strong>大语言模型</strong>
  <p>1. DeepSeek R1 Distill Qwen 32B</p>
 <p>DeepSeek R1 Distill Qwen 32B 是基于 Qwen 2.5 32B 的精馏大型语言模型，
  使用了 DeepSeek R1 的输出结果。在各种基准测试中，它的表现都优于 OpenAI 的 o1-mini，
  在密集模型方面取得了新的先进成果。
  </p>

<p>2. OpenAI o1-mini</p>
<p>o1-mini 是一种快速、经济高效的推理模型，专为编码、数学和科学用例量身定制。
  作为 OpenAI 最新、最强大的模型系列，o1 的设计目的是在做出反应之前花费更多时间进行思考。
o1 模型针对数学、科学、编程和其他 STEM 相关任务进行了优化。它们在物理、化学和生物学的基准测试中始终保持着博士级的准确度。
</p>

<p>3. GPT-4o</p>
 <p>GPT-4o （"o "表示 “omni”）是OpenAI最先进的模型。它是多模态的（接受文本或图像输入并输出文本），
  具有与 GPT-4 Turbo 相同的高智能，但效率更高–生成文本的速度快 2 倍，成本低 50%。此外，
  GPT-4o 在非英语语言方面的视觉和性能也是OpenAI所有模型中最好的。</p>
 
 <p>4. GPT-4o mini</p>
 <p>GPT-4o mini（"o "代表 "omni"）是OpenAI最先进的模型，也是最便宜的模型。
  它具有多模态功能（接受文本或图像输入并输出文本），智能程度高于 gpt-3.5-turbo，但速度一样快。
  它适用于较小的任务，包括视觉任务。建议您在使用 gpt-3.5-turbo 时选择 gpt-4o-mini，因为该模型功能更强，价格更便宜。
  </p>

 <p>5. GPT-3.5 Turbo</p>
 <p>GPT-3.5 Turbo 模型可以理解和生成自然语言或代码，表现也同样出色，是个性价比较高的语言模型。 </p>

<p>6. Google Gemini Flash 2.0</p>
 <p>与 Gemini Flash 1.5 相比，Gemini Flash 2.0 的首次标记时间 (TTFT) 明显更快，
  同时保持了与 Gemini Pro 1.5 等大型型号相同的质量。它在多模式理解、编码能力、
  复杂指令跟踪和函数调用方面都有显著增强。这些进步共同带来了更无缝、更强大的代理体验。</p>
 
  <p>7. 01.AI Yi Large</p>
 <p>  Yi Large 模型由 01.AI 设计，考虑到了以下用例：知识搜索、数据分类、类人聊天机器人和客户服务。
它的突出特点是精通多种语言，尤其是西班牙语、中文、日语、德语和法语。</p>


 <strong>积分制度</strong>
 <p> AI·Joe的消耗都用积分进行计算，采用预付费机制，用多少花多少。每个新用户都会赠送800积分的体验分，用完即需充值。具体参看
   <nuxt-link to="/user/price"  text-orange-900>
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
 <p>文档:  <a target="_blank" href="https://doc.ilark.io">https://doc.ilark.io</a></p> 
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