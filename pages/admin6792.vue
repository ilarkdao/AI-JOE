<template>
<div px-2 lg:px-20 pt-5 v-if="user.username == 'lemooljiang'">
   <div text-center>
    <h2>Base / Polygon充值订单</h2>  
   </div>
   <n-grid x-gap="20" y-gap="20" cols="16" item-responsive responsive="screen" text-3.2>
      <n-grid-item span="8 l:4" v-for="(item,index) in orders" :key="index" border-dashed border-1>
        <div text-1.6>hash： {{ item.hash }}</div>
        <div>用户名： {{ item.username}}</div>
        <div>充值方式： {{ item.pay_method}}</div>
        <div text-2.8>地址： {{ item.pay_account}}</div>
        <div>充值金额： {{ item.amount }}</div>
        <div>支付时间： {{ TimesToLocal(item.created) }}</div> 
      </n-grid-item>
   </n-grid>

</div>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')
const user = useCookie('user')
// const token = useCookie('token', {maxAge: 60 * 60 * 24 * 30})
// const user = useCookie('user', {maxAge: 60 * 60 * 24 * 30})
const orders = ref(null)
//获取订单
const getOrders = async () => { 
  let { data, pending, error } = await getHttp('/polygon/orders', token.value)
  console.log(666, "order", data.value, 444, error.value)
  //处理pending，否则刷新时会报错！
  if(pending.value){
    await sleep()
    if(pending.value){
      await sleep()
    }
  }
  orders.value = data.value.polygonhistory
}

if(process.client){
  getOrders()
}

</script>
