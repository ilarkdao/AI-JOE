<template>
<div px-2 lg:px-20 pt-5 v-if="user.username == 'lemooljiang'">
   <div text-center>
    <h2>管理充值订单</h2>  
   </div>
   <!-- <div flex mb-4 h-6 items-center justify-between> 
      <p>选择充值金额：</p> 
      （ w-52vw lg:w-25vw）
   </div> -->

   <n-grid x-gap="20" y-gap="20" cols="16" item-responsive responsive="screen" text-3.2>
      <n-grid-item span="8 l:4" v-for="(item,index) in orders" :key="index" border-dashed border-1>
        <div>订单号： {{ item._id }}</div>
        <div>用户名： {{ item.username}}</div>
        <div>充值方式： {{ item.pay_method}}</div>
        <div>帐户名： {{ item.pay_account}}</div>
        <div>充值金额： {{ item.amount }}</div>
        <div>创建时间： {{ TimesToLocal(item.created) }}</div> 
        <div v-if="item.paid">支付时间： {{ TimesToLocal(item.paid) }}</div> 
        <div>状态： {{ item.status }}</div>
        <div my-2 text-center v-if="item.status =='paid'">
          <n-button  type="error" @click="revoke(item._id)" :disabled='revokeFlag'>
            回退
          </n-button>
        </div>
        <div my-2 text-center v-if="item.status =='created'">
          <n-button  type="warning" @click="submit(item._id)" :disabled='clickFlag'>
            谨慎确定 
          </n-button>
        </div>
        <div my-2 text-center v-if="item.status =='paid'">
          <n-button  type="primary" @click="submit(item._id)" :disabled='clickFlag'>
            确定充值 
          </n-button>
        </div>
      </n-grid-item>
   </n-grid>

</div>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')
const user = useCookie('user')
const orders = ref(null)
//获取订单
const getOrders = async () => { 
  let { data, pending, error } = await getHttp('/pay/orders', token.value)
  console.log(6667, "order", data, 996, data?.value, 444, error.value)
  //处理pending，否则刷新时会报错！
  if(pending.value){
    await sleep()
    if(pending.value){
      await sleep()
    }
  }
  orders.value = data?.value?.payhistory
}

if(process.client){
  getOrders()
}
const clickFlag = ref(false) 
const revokeFlag = ref(false) 
const revoke = async (id) => {
  revokeFlag.value = true
  let body = {
    id: id
  }
  let { data,  error } = await postHttp('/pay/revoke', body, token.value)
  if(error.value) {
    // console.log(444, error.value)
    message.error("失败！\n"+error.value.data, { duration: 5e3 })
    return
  }
  message.success("回退订单成功！", { duration: 5e3 })
}
const submit = async (id) => {
  // console.log(256, "submit", id)
  clickFlag.value = true
  let body = {
    id: id
  }
  let { data,  error } = await postHttp('/pay/finished', body, token.value)
  if(error.value) {
    // console.log(444, error.value)
    message.error("失败！\n"+error.value.data, { duration: 5e3 })
    return
  }
  message.success("确认订单成功！", { duration: 5e3 })
}
</script>
