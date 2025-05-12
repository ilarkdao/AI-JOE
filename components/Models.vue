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
    label: "DeepSeek R1 Distill Qwen 32B",
    value: "deepseek/deepseek-r1-distill-qwen-32b",
  },
  {
    label: "OpenAI o1-mini",
    value: "o1-mini",
  },
  {
    label: "GPT-4o",
    value: "gpt-4o",
  },
  {
    label: "GPT-4o mini",
    value: "gpt-4o-mini",
  },
  {
    label: "GPT-3.5 Turbo",
    value: "gpt-3.5-turbo" 
  },
  {
    label: "Google Gemini Flash 2.0",
    value: "google/gemini-2.0-flash-001"
  },
  {
    label: "01.AI Yi Large",
    value: "01-ai/yi-large",
  }]

const defaultModel = ref("deepseek/deepseek-r1-distill-qwen-32b")
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
