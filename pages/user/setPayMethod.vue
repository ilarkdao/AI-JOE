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
   <div flex mb-4 h-6 items-center justify-between v-if="method == 'wechatpay'">
      <p>付款帐户名：</p>
      <div w-52vw lg:w-30vw>
        <n-input 
          v-model:value="account"
          placeholder="请输入微信付款帐户名"
        />
      </div>
   </div>
   <div flex mb-4 h-6 justify-center items-center  v-if="method != 'wechatpay'">
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

   
   <div my-8 h-6 text-red-500 v-if="method == 'wechatpay'">
      <p>特别注意：此处的帐户名是微信支付的账户！
      </p>
   </div>
   <!-- <div my-8 h-6  text-red-500 v-else>
    <p>特别注意： Base / Polygon网络充值要先安装好MetaMask钱包，切换到相应的主网，并有相应的token。 </p>
    <p><a target="_blank" href="https://doc.ilark.io/basein.html">-> 参考文档</a></p>
   </div> -->

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
const method = ref('wechatpay')
const account = ref('')
const options = [
  // {
  //   label: "AIJoe(Base)",
  //   value: "aijoe",
  // },
  // {
  //   label: "Slime(Base)",
  //   value: "Slime",
  // },
  // {
  //   label: "USDT(Base)",
  //   value: "usdtbase",
  // },
  // {
  //   label: "USDT(Polygon)",
  //   value: "usdt",
  // },
  // {
  //   label: "LARK(Polygon)",
  //   value: "lark",
  // },
  {
    label: "微信支付",
    value: "wechatpay"
  },
  {
    label: "支付宝",
    value: "alipay",
    disabled: true
  }]

const submit = async () => {
  clickFlag.value = true
  
  let signer
  switch (method.value) {
    /*
    case "aijoe":
      signer = await metaMaskConnBase()
      // console.log(2693, signer)
      if(signer == null){
        message.error("没有联上MetaMask钱包！", { duration: 5e3 })
        return
      }
      account.value = "Base帐户"
      break;
    case "Slime":
      signer = await metaMaskConnBase()
      if(signer == null){
        message.error("没有联上MetaMask钱包！", { duration: 5e3 })
        return
      }
      account.value = "Base帐户"
      break;
    case "usdtbase":
      signer = await metaMaskConnBase()
      if(signer == null){
        message.error("没有联上MetaMask钱包！", { duration: 5e3 })
        return
      }
      account.value = "Base帐户"
      break;
    case "usdt":
      signer = await metaMaskConnPol()
      if(signer == null){
        message.error("没有联上MetaMask钱包！", { duration: 5e3 })
        return
      }
      account.value = "Polygon帐户"
      break;
    case "lark":
      signer = await metaMaskConnPol()
      if(signer == null){
        message.error("没有联上MetaMask钱包！", { duration: 5e3 })
        return
      }
      account.value = "Polygon帐户"
      break;
    */
    case "wechatpay":
      break;
    default:
      console.log('请选择正确的充值方式！')
      message.error("请选择正确的充值方式！", { duration: 5e3 })
      return
  }
  console.log(5389, "account info:", method.value, account.value)

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
    message.error("失败！\n"+error.value, { duration: 5e3 })
    return
  }
  message.success("充值方式添加成功！", { duration: 5e3 })
  //将充值方式存入cookie
  const payMethod = useCookie('payMethod', {maxAge: 60 * 60})  //60分钟
  payMethod.value = data.value.paymethod

  if(method.value == 'wechatpay'){
    navigateTo('/user/createorder')
  } 
  // else {
  //   navigateTo('/user/cryptonet')
  // }
}

</script>
