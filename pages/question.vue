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
 <p>1. OpenAI o1-preview</p>
 <p>o1-preview 是新推理模型，适用于需要广泛常识的复杂任务。它的推理时间变长，能构建更长的思维链，能进行更深入的思考。
  在数理、编程领域在某些问题上已超过了相关的博士。
  </p>

 <p>2. OpenAI o1-mini</p>
 <p>o1-mini 是一种快速、经济高效的推理模型，专为编码、数学和科学用例量身定制。</p>

 <p>3. GPT-4o mini</p>
 <p>GPT-4o mini（"o "代表 "omni"）是OpenAI最先进的模型，也是最便宜的模型。
  它具有多模态功能（接受文本或图像输入并输出文本），智能程度高于 gpt-3.5-turbo，但速度一样快。
  它适用于较小的任务，包括视觉任务。建议您在使用 gpt-3.5-turbo 时选择 gpt-4o-mini，因为该模型功能更强，价格更便宜。
  </p>

 <p>4. GPT-4o</p>
 <p>GPT-4o （"o "表示 “omni”）是OpenAI最先进的模型。它是多模态的（接受文本或图像输入并输出文本），
  具有与 GPT-4 Turbo 相同的高智能，但效率更高–生成文本的速度快 2 倍，成本低 50%。此外，
  GPT-4o 在非英语语言方面的视觉和性能也是OpenAI所有模型中最好的。</p>

 <p>5. GPT-4 Turbo</p>
 <p>GPT-4是由OpenAI新推出的一种自然语言处理（NLP）模型，被认为是已知最强的语言模型，其智力和推理能力与优秀的本科生相当。
  它几乎可以处理任何事务：可以生成高质量的文本，其生成的文本的质量接近于人类写作。它也可以理解和推理各种类型的问题。
  它在很多方面已超越人类。</p>

 <p>6. GPT-3.5 Turbo</p>
 <p>GPT-3.5 Turbo 模型可以理解和生成自然语言或代码，表现也同样出色，是个性价比较高的语言模型。 </p>

 <p>7. Google: Gemma 7B</p>
 <p>谷歌的 Gemma 是“全球性能最强大、轻量级”的新一代开源系列模型。它采用了最新的纯解码器文本到文本技术。
  它在问题解答、总结和推理等文本生成任务中提供英语语言功能。Gemma 7B 变体的性能可与领先的开源模型相媲美。</p>
  
<p>8. Google: Gemini Pro</p>
 <p>Gemini 是 Google 团队跨部门大规模协作的成果，是第一个在 MMLU（大规模多任务语言理解）方面超越人类专家的模型。它从头开始构建，
  是多模态的，这意味着它可以概括和无缝地理解、操作并结合不同类型的信息，包括文本、代码、音频、图像和视频。</p>
 
 <p>9. Google: PaLM2 Chat</p>
 <p>谷歌出品的聊天语言模型，有最新的数据集（2023年2月），有更好的兼容性和更强的性价比。</p>

 <p>10. Code Llama Instruct</p>
 <p>Meta AI 发布的 Code Llama ，这是一个可以使用文本提示生成代码的大型语言模型 (LLM)。 
  Code Llama 是针对代码任务的公开LLM的最先进技术，有可能使当前开发人员的工作流程更快、更高效，
  并降低学习编码人员的进入门槛。 但是目前对中文的支持不太好，容易出现乱码。 </p>

  <p>11. Yi 34B Chat</p>
 <p>Yi系列模型是由零一万物团队开源的大模型，在多个权威的中文、英文及通用领域上取得不错的效果。
  使用 15W+ 的高质量语料训练而来微调大模型，旨在为大模型社区用户提供卓越的交互体验。</p>

  <p>12. Perplexity PPLX 70B Online</p>
 <p>Perplexity Labs 在 Llama 2 70B 的基础上开发的更大型的联网聊天模型。在线模式的重点是提供有用的、最新的和符合事实的回复。它解决了现有离线LLMs的局限性，并展示了在提供准确、实时和真实信息方面的卓越性能。。</p>

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