<template>
<div px-2 lg:px-20 pt-5>
   <div text-center>
    <h2>用户帐单</h2>   
    <p> 暂只显示最近的50条记录</p> 
   </div>
   <div v-for="(item,index) in history" :key="index" border-dashed border-1 text-3.2 mb-2>
      <div>信息： {{ item.message }}</div>  
      <div>积分： {{ item.amount }}</div>
      <div>状态： {{ item.type }}</div>
      <div>时间： {{ TimesToLocal(item.created) }}</div>
    </div>
</div>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')
definePageMeta({
  middleware:["auth"]
})

const history = ref(null)
//获取订单
const getHistory = async () => { 
  let { data,  error } = await getHttp('/userapi/getBalancHistory', token.value)
  if(error.value) {
    message.error("失败！\n"+error.value.data, { duration: 5e3 })
    return
  }
  history.value = data.value.history
}
getHistory()
</script>
