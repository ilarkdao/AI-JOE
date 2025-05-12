<template>
<div ml-auto>
  <n-space vertical w-50vw lg:w-34vw>
    <n-select v-model:value="visionModel" size="small" :options="options"/>
  </n-space> 
</div>
</template>

<script setup>
const options = [
  {
    label: "GPT-4o",
    value: "gpt-4o",
  },
  {
    label: "GPT-4o mini",
    value: "gpt-4o-mini",
  }]

const visionModel = ref("gpt-4o")
if(process.client){
  // console.log("136, vllms", vllms)
  let setVisionModel = localStorage.getItem(vllms)
  if(setVisionModel != null){
    visionModel.value = setVisionModel
  }
}  

defineExpose({
  visionModel
})
</script>
