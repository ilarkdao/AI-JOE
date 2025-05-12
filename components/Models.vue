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
<<<<<<< HEAD
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
=======
    label: "GPT-3.5 Turbo",
    value: "gpt-3.5-turbo",
  },
  {
    label: "GPT-4",
    value: "gpt-4",
  },
  {
    label: "Claude v2",
    value: "anthropic/claude-2",
    disabled: true
  },
  {
    label: "Code Llama Instruct (仅英文)",
    value: "meta-llama/codellama-34b-instruct",
  }]

const defaultModel = ref("gpt-3.5-turbo")
>>>>>>> parent of c04a9ed... v7.3 update,add new llm
if(process.client){
  let setModel = localStorage.getItem("setModel")
  if(setModel != null){
    defaultModel.value = setModel
  }
}  

defineExpose({
  defaultModel
})
</script>
