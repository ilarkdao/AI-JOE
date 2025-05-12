<template>
<div px-2 lg:px-20 pt-5 pb-8>
   <div text-center>
    <h2>用户帐单</h2>   
   </div>
   <div v-if="history">
      <div v-for="(item,index) in history" :key="index" border-dashed border-1 text-3.2 mb-2>
          <div>信息： {{ item.message }}</div>  
          <div>积分： {{ item.amount }}</div>
          <div>状态： {{ item.type }}</div>
          <div>时间： {{ TimesToLocal(item.created) }}</div>
        </div>
   </div>
   <!-- <div v-else>暂时还没有帐单记录</div> -->
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

const history = ref(null)
let temp = []
let skip = 20
let skipNum = ref(0)
let moreFlag = ref(false)
let loadingFlag = ref(true)

//获取订单
const getHistory = async () => { 
  let { data, pending,  error } = await getHttp('/userapi/getBalancHistory/0', token.value)
  console.log(666, "data", data)
  if(error.value) {
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
  if(data.value.history.length == 0){ 
    return
  }
  for (let i in data.value.history) {
    temp.push(data.value.history[i])
  }
  history.value = temp
  loadingFlag.value = false
  
  if(data.value.history.length < skip){
    moreFlag.value = false
    return
  }
  moreFlag.value = true
}
if(process.client){
  getHistory()
}

const more = async () => {
  loadingFlag.value = true
  moreFlag.value = false
  skipNum.value += skip
  let { data,  error } = await getHttp('/userapi/getBalancHistory/'+skipNum.value, token.value)
  if(error.value) {
    message.error("失败！\n"+error.value.data, { duration: 5e3 })
    return
  }

  for (let i in data.value.history) {
    temp.push(data.value.history[i])
  }
  history.value = temp
  loadingFlag.value = false
  moreFlag.value = true

  if(data.value.history.length < skip){
    moreFlag.value = false
    message.success("没有更多帐单了！", { duration: 5e3 })
  }
}

</script>
