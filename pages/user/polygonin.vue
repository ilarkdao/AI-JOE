<template>
<div px-2 lg:px-10 pt-5>
   <div text-center>
    <h2>Polygon网络</h2> 
   </div>
   <div flex mb-4 h-6 items-center justify-between>
      <p>充值币种：</p>
      <div w-52vw lg:w-30vw>
        {{ payMethod.pay_method.toUpperCase() }}
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
   <div text-center v-if="clickFlag"><img :src="loading" alt="ai joe loading"></div>
   <n-button block mt-4 items-center type="primary" :disabled='clickFlag' @click="submit">
     确定充值
   </n-button> 
  <div text-3>
      <p><strong>注意：</strong></p> 
      <p>1 USDT = 2860积分， 最小充值金额 1 USDT。</p> 
      <p>1 LARK = 1积分，最小充值金额 800 LARK。</p>
      <p>Polygon网络是即时到帐的！如积分超24小时还未到帐，则请反馈 larkio2021@gmail.com </p>
      <p><a target="_blank" href="https://doc.ilark.io/polygonin.html">-> 参考文档</a></p>
  </div>


</div>
</template>

<script setup>
import { ethers } from 'ethers'
import loading from '/loading.gif'
import { createDiscreteApi } from "naive-ui"
let { message } = createDiscreteApi(["message"])
// const token = useCookie('token')
const token = useCookie('token', {maxAge: 60 * 60 * 24 * 30})
definePageMeta({
  middleware:["auth"]
})
let clickFlag = ref(false)
// const payMethod = useCookie('payMethod') 
const payMethod = useCookie('payMethod', {maxAge: 60 * 60}) 
// console.log(669, payMethod.value.pay_method)  //usdt lark
if(!payMethod.value){
  // console.log(233, payMethod.value)
  let { data,  error } = await getHttp('/pay', token.value)
  if(error.value) {
    // console.log(444, error.value)
    message.error("失败！\n"+error.value)
  }
  //将充值方式存入cookie
  payMethod.value = data.value.paymethod
}

//充值币种和金额 
const tokenX = payMethod.value.pay_method
const amount = ref('')
//生成合约实例
const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)",
    "function balanceOf(address account) external view returns (uint256)",
    "function transfer(address recipient, uint256 amount) external returns (bool)"
  ]

// const larkAddress = '0xaA61b68301278Da4e001d2cF7F8b2202aed6347c' //lark test
// const usdtAddress = '0x4fF472534Cd0eAB7fD89Daa0cDF1F99cC084737b' //lark test 
// const toB = "0x3b2dBD900E9B23E94270ADe010616B9A28293A87"

const larkAddress = '0x4cE8485608F78921Fbc0F96e63c0566B1b176Db0' 
const usdtAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' 
const toB = "0x5278c6A7B0E805c15a8FEe34ddEC27195D5E3138"  //scisan

const submit = async () => {
  //检查最小金额
  if(tokenX == 'usdt' && parseFloat(amount.value) < 1){
      message.error("最小充值金额 1 USDT", { duration: 5e3 })
      return
    } 
  if(tokenX == 'lark' && parseFloat(amount.value) < 800) {
      message.error("最小充值金额 800 LARK", { duration: 5e3 })
      return
    }
  
  clickFlag.value = true
  let signer = await metaMaskConn()
  // console.log(263, signer)
  if(signer == null){
    clickFlag.value = false
    return
  }
  const larkcontract = new ethers.Contract(larkAddress, abi, signer)
  const usdtcontract = new ethers.Contract(usdtAddress, abi, signer)
  //检查余额
  if(tokenX == 'usdt'){
      let balance = await usdtcontract.balanceOf(signer.address) 
      // console.log(66,"USDT余额！", ethers.formatUnits(balance, 6))
      //ethers.formatUnits("1300000000000000000", 6) //6位小数
      if(parseFloat(ethers.formatUnits(balance, 6)) < parseFloat(amount.value)){
        // console.log(899,"USDT余额不足！", ethers.formatUnits(balance, 6))
        message.error("USDT余额不足！", { duration: 5e3 })
        clickFlag.value = false
        return
      } 
  } 
  if(tokenX == 'lark') {
      let balance = await larkcontract.balanceOf(signer.address)
      if(parseFloat(ethers.formatEther(balance)) < parseFloat(amount.value)){
        // console.log(399,"lark余额不足！", ethers.formatEther(balance), amount.value)
        message.error("LARK余额不足！", { duration: 5e3 })
        clickFlag.value = false
        return
      }
  }

  //发送交易
  let tx
  try {
    if(tokenX == 'usdt'){  //ethers.parseUnits("1.3", 6) 
      tx = await usdtcontract.transfer(toB, ethers.parseUnits(amount.value, 6))
      // console.log(1996, "tx.hash", tx.hash)
    } else {
      tx = await larkcontract.transfer(toB, ethers.parseEther(amount.value))
      // console.log(2996, "tx.hash", tx.hash)
    }
  } catch (error) {
    // console.log(44, "error", error)
    message.error("失败！\n"+error, { duration: 5e3 })
    clickFlag.value = false
    return
  }
  
  //tx.hash 0x5e6886898b2ac8d9e44a93ee1c16a29ec636b0a05ae2a51584a68e2438d711ca
  let body = {
    tokenX: tokenX,
    hash: tx.hash
  } 
  let { data,  error } = await postHttp('/polygon/tokenin', body, token.value)
  if(error.value) {
    // console.log(444, error.value)
    message.error("失败！\n"+error.value, { duration: 5e3 })
    clickFlag.value = false
    return
  }
  message.success("充值成功！", { duration: 5e3 })
  clickFlag.value = false

  await sleep()
  //刷新页面
  let router = useRouter()
  router.go(0)
}
</script>
