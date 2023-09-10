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
