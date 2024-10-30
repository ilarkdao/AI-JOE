<template>
<div ml-auto>
  <n-space vertical w-62vw lg:w-40vw>
    <n-select v-model:value="defaultModel" size="small" :options="options"/>
  </n-space> 
</div>
</template>

<script setup>
const options = [
  {
    label: "OpenAI o1-preview",
    value: "openai/o1-preview",
  },
  {
    label: "OpenAI o1-mini",
    value: "openai/o1-mini",
  },
  {
    label: "GPT-4o-mini",
    value: "openai/gpt-4o-mini",
  },
  {
    label: "GPT-4o",
    value: "openai/gpt-4o",
  },
  {
    label: "GPT-4 Turbo",
    value: "openai/gpt-4-turbo",
  },
  {
    label: "GPT-3.5 Turbo",
    value: "openai/gpt-3.5-turbo",
  },
  {
    label: "Google: Gemma 7B",
    value: "google/gemma-7b-it:nitro"
  },
  {
    label: "Google: Gemini Pro",
    value: "google/gemini-pro"
  },
  {
    label: "Google: PaLM2 Chat",
    value: "google/palm-2-chat-bison"
  },
  {
    label: "Meta: CodeLlama 34B Instruct",
    value: "meta-llama/codellama-34b-instruct",
  },
  {
    label: "Yi 34B Chat",
    value: "01-ai/yi-34b-chat",
  },
  {
    label: "Perplexity PPLX 70B Online",
    value: "perplexity/pplx-70b-online",
  }]

const defaultModel = ref("openai/o1-preview")
if(process.client){
  // console.log("111, llms", llms)
  let setModel = localStorage.getItem(llms)
  if(setModel != null){
    defaultModel.value = setModel
  }
}  

defineExpose({
  defaultModel
})
</script>
