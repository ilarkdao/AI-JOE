<template>
<div px-2 lg:px-20 pt-5 v-if="order">
   <!-- <div text-center>
    <h2>扫码付款</h2>
   </div> -->
   <div text-center v-if="order.pay_method == 'alipay'"> 
      <img src="https://ipfs.ilark.io/ipfs/QmZ65G2b9aNzTmWw4erG7GT127yoY6JczwNRe5noF7x3jx" h-100 lg:h-120 alt="ai joe" v-if="order.amount == 50">
      <img src="https://ipfs.ilark.io/ipfs/QmRhZmDMbaaJEekWdcaRWDieD7uyvZk4d7AttjEfmRyo16" h-100 lg:h-120 alt="ai joe" v-if="order.amount == 100">
      <img src="https://ipfs.ilark.io/ipfs/QmSoB4QCAGPtLJTgvYYzMxvRhhq7QSPiRERLXo9aVSDLGP" h-100 lg:h-120 alt="ai joe" v-if="order.amount == 200">
   </div>
   <div text-center v-else> 
      <img src="https://ipfs.ilark.io/ipfs/QmXa4hG6dU8YfzWLHP6uB9x9X9bJz99cWu1RwrLZiFooHd" h-100 lg:h-120 alt="ai joe" v-if="order.amount == 50">
      <img src="https://ipfs.ilark.io/ipfs/QmcmR6W9ULEDDWGPiLc3Audj8H3np45L22VAEZ2LMEBwWv" h-100 lg:h-120 alt="ai joe" v-if="order.amount == 100">
      <img src="https://ipfs.ilark.io/ipfs/QmYtym3XpYtSVJWHh1GTDYyK2AxGxBnB4eMBFBAeoBsdMe" h-100 lg:h-120 alt="ai joe" v-if="order.amount == 200">
   </div>

  <div my-2 text-center>
    请注意使用此帐户支付： {{ order?.pay_account }}
  </div>

  <n-button block mt-4 items-center type="warning" @click="confirmPaid">
     请先扫码付款后再确定
  </n-button> 
</div>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')
definePageMeta({
  middleware:["auth"]
})

const order = ref(null)
const getOrder = async () => { 
  let { data,  error } = await getHttp('/pay/neworder', token.value)
  // console.log(666, "order", data.value.payhistory,"id", typeof data.value.payhistory._id)
  if(error.value) {
    message.error("失败！\n"+error.value.data, { duration: 5e3 })
    return
  }
  order.value = data.value.payhistory
}
getOrder()

const confirmPaid = () => {
  const { dialog } = createDiscreteApi(["dialog"])
      dialog.warning({
          content: "是否已扫码付款？",
          positiveText: "确定已扫码付款",
          negativeText: "取消",
          onPositiveClick: async () => {
              console.log(444, "确定已付款")
              await submit()
          },
      })
}

const submit = async () => {
  let body = {
    id: order.value._id
  }
  let { data,  error } = await postHttp('/pay/paidorder', body, token.value)
  if(error.value) {
    // console.log(444, error.value)
    message.error("失败！\n"+error.value.data, { duration: 5e3 })
    return
  }
  message.success("确认付款成功！", { duration: 5e3 })
  navigateTo('/user/pay')
}
</script>
