<template>
<div pt-5 px-5 lg:px-10>
   <div v-if="methodFlag" textBox>
     <h3>您的余额</h3> 
     <p text-4>{{ balance }} 积分</p>
   </div> 
   <div textBox>
      <div v-if="methodFlag">
        <h3>充值方式</h3> 
      </div>  
      <!-- 没有充值方式 -->
      <div mt-8 text-center v-if="!methodFlag">
        <p>选择充值方式：</p> 
        <nuxt-link to="/user/setpaymethod">
            <n-button type="primary" size="medium">现在设置</n-button>
        </nuxt-link>
      </div>  
      <div mt-4  v-else>
        <div mb-4>充值方式： {{ payMethod?.pay_method }}</div>
        <div mb-4>充值帐户： {{ payMethod?.pay_account }}</div>
        <div flex>
          <nuxt-link to="/user/setpaymethod" mr-4>
            <n-button type="warning" size="medium" >更改充值方式</n-button>
          </nuxt-link>    
          <div mr-4>
            <n-button type="primary" size="medium" v-if="!orderFlag" @click="payTo">现在去充值</n-button>
          </div>
          <nuxt-link to="/user/getOrders">
            <n-button quaternary size="medium">充值记录</n-button>
          </nuxt-link>
        </div>
      </div>
   </div>

   <!-- 未完成的订单 -->
   <div mt-4 v-if="orderFlag" textBox>
    <div v-if="order.status =='created'">
      <h3>您有未付款的充值</h3> 
      <div border-dashed border-1 p-4 mb-4> 
        <div mb-4>订单号： {{ order._id }}</div>
        <div mb-4>充值金额： {{ order.amount }}</div>
        <div>创建时间： {{ TimesToLocal(order.created) }}</div>
      </div>
      <n-button type="warning" size="medium" @click="confirmPaid" mr-4>删除订单</n-button>
      <nuxt-link to="/user/paidOrder">
       <n-button type="primary" size="medium">现在去付款</n-button>
      </nuxt-link>
    </div>
    <div v-else>
      <h3>您有积分尚未到帐，请耐心等待！</h3> 
      <div border-dashed border-1 border-gray-300 p-4 mb-4>
        <div mb-4>订单号： {{ order._id }}</div>
        <div mb-4>充值金额： {{ order.amount }}</div>
        <div>付款时间： {{ TimesToLocal(order.paid) }}</div>
      </div>
    </div>
   </div> 

</div>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
let { message } = createDiscreteApi(["message"])
definePageMeta({
  middleware:["auth"]
})

// const token = useCookie('token')
// const user = useCookie('user')
// const balance = useCookie('balance')

const token = useCookie('token', {maxAge: 60 * 60 * 24 * 30})
const user = useCookie('user', {maxAge: 60 * 60 * 24 * 30})
const balance = useCookie('balance', {maxAge: 60 * 60 * 6})

const methodFlag = ref(false)
const payMethod = useCookie('payMethod', {maxAge: 60 * 60})  //60分钟

const orderFlag = ref(false)
const order = ref(null)

//查找充值方式
const getData = async () =>{
  let { data,  error } = await getHttp('/pay', token.value)
  if(error.value) {
     return
  }
  methodFlag.value = true
  //将充值方式存入cookie
  payMethod.value = data.value.paymethod

  //获取订单
  let { data:dataX,  error:errorX} = await getHttp('/pay/neworder', token.value)
  if(errorX.value) {
    // console.log(444, "errorX.value", errorX.value)
    return
  }
  orderFlag.value = true  //有未完成的订单
  order.value = dataX.value.payhistory
}
if(process.client){
  getData()
}

const payTo = () => {
  if(payMethod.value.pay_method == 'usdt' || payMethod.value.pay_method == 'lark'){
    navigateTo('/user/polygonin')
  } else {
    navigateTo('/user/createorder')
  }
}

const confirmPaid = () => {
  const { dialog } = createDiscreteApi(["dialog"])
      dialog.warning({
          content: "是否要删除充值订单？",
          positiveText: "确定删除",
          negativeText: "取消",
          onPositiveClick: async () => {
              await deleteOrder()
          },
      })
}

const deleteOrder = async () => {
  let body = {
    id: order.value._id
  }
  let { data,  error} = await postHttp('/pay/deleteorder', body, token.value)
  if(error.value) {
    message.error("删除失败！\n"+error.value.data, { duration: 5e3 })
    return
  }
  message.success("删除成功！", { duration: 5e3 })
  orderFlag.value = false
}
</script>
