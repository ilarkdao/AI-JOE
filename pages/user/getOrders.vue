<template>
<div px-2 lg:px-20 pt-5>
   <!-- 支付宝 / 微信充值记录 -->
   <div v-if="history">
    <div text-center>
      <h2>微信充值(/支付宝)记录</h2>   
    </div>
    <div v-for="(item,index) in history" :key="index" border-dashed border-1 text-3.2 mb-2>
        <div>订单号： {{ item._id }}</div>  
        <div>充值方式： {{ item.pay_method }}</div>
        <div>充值帐户： {{ item.pay_account }}</div>
        <div>充值金额：￥{{ item.amount }}</div>
        <div v-if="item.finished">完成时间： {{ TimesToLocal(item.finished) }}</div>
        <div v-else>
          <div>创建时间： {{ TimesToLocal(item.created) }}</div>
          完成状态：尚在进行中...
        </div>
    </div>
   </div>

   <div text-center v-if="loadingFlag"><img :src="loading" alt="ai joe loading"></div>
   <div v-if="!history && !loadingFlag">暂没有充值记录</div>
</div>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
import loading from '/loading.gif'
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')
// let token = useCookie('token', {maxAge: 60 * 60 * 24 * 30})
definePageMeta({
  middleware:["auth"]
})

const history = ref(null)
// const polygonhistory = ref(null)
let loadingFlag = ref(true)
//获取Polygon订单
/*
const getPolygonHistory = async () => {
  let { data, pending, error } = await getHttp('/polygon/userorders', token.value)
  // console.log(566, "getPolygonHistory", data.value)
  if(error.value) {
    // console.log(444, errorX.value)
    message.error("查找失败！\n"+error.value.data, { duration: 5e3 })
    return
  }
  //处理pending，否则刷新时会报错！
  if(pending.value){
    await sleep()
    if(pending.value){
      await sleep()
    }
  }
  if(data.value.polygonhistory.length == 0){
    // loadingFlag.value = false
    return
  }
  polygonhistory.value = data.value.polygonhistory
}
*/

//获取支付宝订单
const getHistory = async () => {
  let { data, pending, error } = await getHttp('/pay/userorders', token.value)
  if(error.value) {
    // console.log(444, errorX.value)
    message.error("查找失败！\n"+error.value.data, { duration: 5e3 })
    return
  }
  //处理pending，否则刷新时会报错！
  if(pending.value){
    await sleep()
    if(pending.value){
      await sleep()
    }
  }
  if(data.value.payhistory.length == 0){ 
    loadingFlag.value = false
    return
  }
  loadingFlag.value = false
  history.value = data.value.payhistory
}
if(process.client){
  getHistory()
}
</script>
