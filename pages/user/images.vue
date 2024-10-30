<template>
<div px-2 lg:px-20 pt-5 pb-8>
  <div v-if="images">
    <div v-for="(item,index) in images" :key="index" :id=item._id textBox>
        <div flex ><div ml-auto px-1 hover:bg-red @click="deleteImage(item._id)">X</div></div>
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
  <div v-if="!images && !loadingFlag">暂时还没有图片</div>
  <div text-center v-if="loadingFlag"><img :src="loading" alt="ai joe loading"></div>
  <div text-center><n-button @click="more" v-if="moreFlag" strong secondary>更多</n-button></div>
</div>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
import loading from '/loading.gif'
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')
definePageMeta({
  middleware:["auth"]
})

let images = ref(null)
let temp = []
let skip = 20
let skipNum = ref(0)
let moreFlag = ref(false)
let loadingFlag = ref(true)

//获取图片
const getImages = async () => { 
  let { data, pending, error } = await getHttp('/imageapi/images/0', token.value)
  // console.log(22, data.value, 664, error.value)
  if(error.value) {
    // console.log(444, error.value)
    message.error("失败！\n"+error.value.data, { duration: 5e3 })
    return
  }
  //处理pending，否则刷新时会报错！
  if(pending.value){
    await sleep()
    if(pending.value){
      await sleep()
    }
  }

  // console.log(666, "history", data.value)
  if(data.value.images.length == 0){  //没有图片
    loadingFlag.value = false
    return
  }

  for (let i in data.value.images) {
    temp.push(data.value.images[i])
  }
  images.value = temp
  loadingFlag.value = false
  
  if(data.value.images.length < skip){
    moreFlag.value = false
    return
  }
  moreFlag.value = true

}
if(process.client){
  getImages()
}

const deleteImage = async (imageId) => {
  let body = {
    id: imageId
  }
  let { data,  error} = await postHttp('/imageapi/delimage', body, token.value)
  if(error.value) {
    message.error("删除失败！\n"+error.value.data, { duration: 5e3 })
    return
  }
  document.getElementById(imageId).remove()
  message.success("删除成功！", { duration: 5e3 })
}

const more = async () => {
  loadingFlag.value = true
  moreFlag.value = false
  skipNum.value += skip
  let { data,  error } = await getHttp('/imageapi/images/'+skipNum.value, token.value)
  if(error.value) {
    message.error("失败！\n"+error.value.data, { duration: 5e3 })
    return
  }
  // console.log(6687, data.value.images)

  for (let i in data.value.images) {
    temp.push(data.value.images[i])
  }
  images.value = temp
  loadingFlag.value = false
  moreFlag.value = true

  if(data.value.images.length < skip){
    moreFlag.value = false
    message.success("没有更多图片了！", { duration: 5e3 })
  }
}
</script>
