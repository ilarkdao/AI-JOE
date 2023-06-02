<template>
<div px-2 lg:px-20 pt-5>
  <div v-if="images">
    <div>
      <p> 暂只显示最近的50组图片</p>   
    </div>
    <div v-for="(item,index) in images" :key="index" textBox>
        <div v-for="(itemimg, index2) in item.img_url" :key="index2" inline mr-4>
          <n-image
              width="200" 
              :src="itemimg" rounded-2 alt="ai joe"
            /> 
        </div>
        <div>模型： {{ item.img_model }}</div>
        <div>关键词： {{ item.prompt }}</div>
        <div>时间： {{ TimesToLocal(item.created) }}</div>
    </div>
  </div>
  <div v-else>暂时还没有图片</div>
</div>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')
definePageMeta({
  middleware:["auth"]
})

const images = ref(null)
//获取订单
const getHistory = async () => { 
  let { data,  error } = await getHttp('/imageapi/images', token.value)
  // console.log(22, data.value, 664, error.value)
  if(error.value) {
    // console.log(444, error.value)
    message.error("失败！\n"+error.value.data, { duration: 5e3 })
    return
  }
  // console.log(666, "history", data.value)
  if(data.value.images.length == 0){  //没有图片
    return
  }
  images.value = data.value.images
}
getHistory()
</script>
