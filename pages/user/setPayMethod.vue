<template>
<div px-2 lg:px-10 pt-5>
   <div text-center>
    <h2>设置充值方式</h2> 
   </div>
   <div flex mb-4 h-6 items-center justify-between>
      <p>选择充值方式：</p>
      <n-space vertical w-52vw lg:w-30vw>
         <n-select v-model:value="method" :options="options" />
      </n-space> 
   </div>
   <div flex mb-4 h-6 items-center justify-between>
      <p>充值帐户名：</p>
      <div w-52vw lg:w-30vw>
        <n-input 
          v-model:value="account"
          placeholder="请输入充值帐户名"
        />
      </div>
   </div>
   <n-button block mt-4 items-center type="primary" @click="submit">
     提交资料
   </n-button> 
    <div flex my-8 h-6 items-center text-red-500>
      <p>特别注意： 此处的帐户名是与充值的帐户名一致，比如用支付宝，则填入支付宝的帐户！
        用微信支付，则填入微信的帐户！
      </p>
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

//充值方式
const method = ref('alipay')
const account = ref('')
const options = [
  {
    label: "支付宝",
    value: "alipay",
  },
  {
    label: "微信支付",
    value: "wechatpay"
  }]

const submit = async () => {
  if(account.value == ''){
    message.error("帐户名不能为空！", { duration: 5e3 })
    return
  }
  let body = {
    method: method.value,
    account: account.value
  }
  let { data,  error } = await postHttp('/pay/createmethod', body, token.value)
  if(error.value) {
    console.log(444, error.value)
    message.error("失败！\n"+error.value, { duration: 5e3 })
    return
  }
  message.success("添加资料成功！", { duration: 5e3 })
  //将充值方式存入cookie
  const payMethod = useCookie('payMethod', {maxAge: 60 * 60})  //60分钟
  payMethod.value = data.value.paymethod
  navigateTo('/user/createorder')
}
</script>
