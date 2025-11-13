<template>
<div px-2 lg:px-10 pt-5>
   <div text-center>
    <h2 v-if="tokenX == 'usdtbase'">Base 网络</h2> 
    <h2 v-else>Polygon 网络</h2> 
   </div>
   <div flex mb-4 h-6 items-center justify-between>
      <p>充值币种：</p>
      <div w-52vw lg:w-30vw>
        {{ tokenView }}
      </div>
   </div>
   <div flex mb-4 h-6 items-center justify-between>
      <p>充值金额：</p>
      <div w-52vw lg:w-30vw>
        <n-input 
          v-model:value="amount"
          placeholder="请输入金额"
        />
      </div>
   </div>
   <!-- <div flex mb-4 h-6 items-center justify-between>
      <p>可得积分：</p>
      <div w-52vw lg:w-30vw>
        <n-input 
          v-model:value="jifen"
        />
      </div>
   </div> -->
   <div text-center v-if="clickFlag"><img :src="loading" alt="aijoe loading"></div>
   <n-button block mt-4 items-center type="primary" :disabled='clickFlag' @click="submit">
     确定充值
   </n-button> 
  <div text-3 > 
      <p><strong>注意：</strong></p> 
      <p>1 USDT = 2860积分， 最小充值金额 1 USDT。</p> 
      <p>Base / Polygon 网络是即时到帐的！如积分超24小时还未到帐，则请反馈 larkio2021@gmail.com </p>
      <p><a target="_blank" href="https://doc.ilark.io/basein.html">-> 参考文档</a></p>
  </div>

</div>
</template>
 
<script setup>
import { ethers } from 'ethers'
import loading from '/loading.gif'
import { NInput, NButton, createDiscreteApi } from "naive-ui"
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')
const balanceX = useCookie('balance', {maxAge: 60 * 60 * 6})  //6小时 

definePageMeta({
  middleware:["auth"]
})

let clickFlag = ref(false)
// const payMethod = useCookie('payMethod') 
const payMethod = useCookie('payMethod', {maxAge: 60 * 60}) 
// console.log(669, payMethod.value.pay_method)
if(!payMethod.value){
  let { data,  error } = await getHttp('/pay', token.value)
  if(error.value) {
    message.error("失败！\n"+error.value)
  }
  //将充值方式存入cookie
  payMethod.value = data.value.paymethod
}


//充值币种和金额 
const tokenX = payMethod.value.pay_method
// const tokenX = "usdt"
const amount = ref('') 
const tokenView = ref('USDT')
// switch (tokenX) {
//   case "usdtbase":
//     tokenView.value = "USDT"
//     break;
//   case "usdt":
//     tokenView.value = "USDT"
//     break; 
//   default:
//     tokenView.value = "请先选择充值币种"
// }


const submit = async () => {
  //分币种执行
  let signer, contract, balance
  switch (tokenX) {
    case "usdtbase":
      //检查最小金额
      if(parseFloat(amount.value) < 1) {
          message.error("最小充值金额 1 USDT", { duration: 5e3 })
          return
      }
      signer = await metaMaskConnBase()
      if(signer == null){
        message.error("没有联上MetaMask钱包！", { duration: 5e3 })
        return
      }
      //检查余额
      contract = new ethers.Contract(usdtbaseCon, abi, signer)
      balance = await contract.balanceOf(signer.address)
      if(parseFloat(ethers.formatUnits(balance, 6)) < parseFloat(amount.value)){
        message.error("USDT余额不足！", { duration: 5e3 })
        return
      }
      break;
    case "usdt":
      //检查最小金额
      if(parseFloat(amount.value) < 1) {
          message.error("最小充值金额 1 USDT", { duration: 5e3 })
          return
      }
      signer = await metaMaskConnPol()
      if(signer == null){
        message.error("没有联上MetaMask钱包！", { duration: 5e3 })
        return
      }
      //检查余额
      contract = new ethers.Contract(usdtAddress, abi, signer)
      balance = await contract.balanceOf(signer.address)
      if(parseFloat(ethers.formatUnits(balance, 6)) < parseFloat(amount.value)){
        message.error("USDT余额不足！", { duration: 5e3 })
        return
      }
      break;
    default:
      console.log('请选择正确的充值方式！')
      message.error("请选择正确的充值方式！", { duration: 5e3 })
      return
  }
  clickFlag.value = true
 
  //发送交易
  let tx
  try {
    switch (tokenX) {
      case "usdtbase":
        tx = await contract.transfer(toB, ethers.parseUnits(amount.value, 6))
        // console.log(156, "tx", tx)
        break;
      case "usdt":
        tx = await contract.transfer(toB, ethers.parseUnits(amount.value, 6))
        break;  
      default:
        console.log('请选择正确的充值方式！')
        message.error("请选择正确的充值方式！", { duration: 5e3 })
        return
    }
  } catch (error) {
    message.error("失败！\n"+error, { duration: 5e3 })
    clickFlag.value = false
    return
  }
  
  if(tokenX == "usdtbase"){ //base 
    //tx.hash 0x048122eb30b56bf478eed60d2a22cf92237746220139f1e4336ce3ebfcc08e85
    let body = {
      tokenX: tokenX,
      hash: tx.hash
    } 
    let { data,  error } = await postHttp('/base/btokenin', body, token.value)
    // let { data,  error } = await postHttp('/basein', body) 测试
    if(error.value) {
      message.error("失败！\n"+error.value, { duration: 5e3 })
      clickFlag.value = false
      return
    }
  } else { 
    //polygon
    let body = {
      tokenX: tokenX,
      hash: tx.hash
    } 
    let { data,  error } = await postHttp('/polygon/tokenin', body, token.value)
    // let { data,  error } = await postHttp('/polygonin', body) 测试
    if(error.value) {
      message.error("失败！\n"+error.value, { duration: 5e3 })
      clickFlag.value = false
      return
    }
  }
  
  //更新余额
  message.success("充值成功！", { duration: 5e3 })

  let { data:dataX,  error } = await getHttp('/getBalance', token.value)
  // console.log(69339, "balance", dataX, dataX.value)
  balanceX.value = dataX.value?.balance
  amount.value = ''
  clickFlag.value = false


  //刷新页面
  // await sleep() 
  // let router = useRouter()
  // router.go(0)
}

</script>
