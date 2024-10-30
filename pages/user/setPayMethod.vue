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
   <div flex mb-4 h-6 items-center justify-between v-if="method == 'alipay' || method == 'wechatpay'">
      <p>充值帐户名：</p>
      <div w-52vw lg:w-30vw>
        <n-input 
          v-model:value="account"
          placeholder="请输入充值帐户名"
        />
      </div>
   </div>
   <div flex mb-4 h-6 justify-center items-center  v-if="method == 'usdt' || method == 'lark'">
      <div mt-6>
        <img
          width="70"
          height="50" 
          :src="metamaskLog" alt="ai joe" 
        />
      </div>
      <div>
        <n-button mt-4 items-center type="primary" @click="submit" :disabled='clickFlag'>
          连接MetaMask钱包
        </n-button>
      </div>
   </div>
   <div v-else>
    <n-button block mt-4 items-center type="primary" @click="submit" :disabled='clickFlag'>
      确认提交
    </n-button>
   </div>

   <div my-8 h-6  text-red-500 v-if="method == 'usdt' || method == 'lark'">
    <p>特别注意： Polygon网络充值要先安装好MetaMask钱包，并有相应的token。 </p>
    <p><a target="_blank" href="https://doc.ilark.io/polygonin.html">-> 参考文档</a></p>
   </div>
   <div my-8 h-6 text-red-500 v-else>
      <p>特别注意：此处的帐户名是与充值的帐户名一致，比如用支付宝，则填入支付宝的帐户！
        用微信支付，则填入微信的帐户！
      </p>
      <p><a target="_blank" href="https://doc.ilark.io/polygonin.html">-> 参考文档</a></p>
   </div>

</div>
</template>

<script setup>
import metamaskLog from '/metamask.svg'
import { createDiscreteApi } from "naive-ui"
let { message } = createDiscreteApi(["message"])
// const token = useCookie('token')
const token = useCookie('token', {maxAge: 60 * 60 * 24 * 30})
definePageMeta({
  middleware:["auth"]
})
let clickFlag = ref(false)
//充值方式
const method = ref('usdt')
const account = ref('')
const options = [
  {
    label: "USDT(Polygon)",
    value: "usdt",
  },
  {
    label: "LARK(Polygon)",
    value: "lark",
  },
  {
    label: "支付宝",
    value: "alipay",
  },
  {
    label: "微信支付",
    value: "wechatpay"
  }]

const submit = async () => {
  clickFlag.value = true
  if(method.value == 'usdt' || method.value == 'lark'){
    let signer = await metaMaskConn()
    // console.log(263, signer)
    if(signer == null){
      return
    }
    account.value = "Polygon帐户"
  }

  if(account.value == ''){
    message.error("帐户名不能为空！", { duration: 5e3 })
    return
  }
  let body = {
    method: method.value,
    account: account.value
  }
  let { data,  error } = await postHttp('/pay/createmethod', body, token.value)
  // console.log(668, data.value)
  if(error.value) {
    // console.log(444, error.value)
    message.error("失败！\n"+error.value, { duration: 5e3 })
    return
  }
  message.success("添加资料成功！", { duration: 5e3 })
  //将充值方式存入cookie
  const payMethod = useCookie('payMethod', {maxAge: 60 * 60})  //60分钟
  payMethod.value = data.value.paymethod
  if(method.value == 'usdt' || method.value == 'lark'){
    navigateTo('/user/polygonin')
  } else {
    navigateTo('/user/createorder')
  }
  
}
</script>
