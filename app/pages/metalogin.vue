<template>
    <div w-80 h-60 text-center>
        <h4 pb-4 text-xl text-gray-500> MetaMask登录 </h4>
        <div flex mb-8  justify-center items-center>
            <div mt-6>
                <img
                width="100"
                height="80" 
                :src="metamaskLog" alt="aijoe" 
                />
            </div>
        <div>
            <n-button mt-4 items-center type="primary" @click="onSubmit" :disabled='clickFlag'>
                连接并签名
            </n-button>
        </div>
        </div>
        <!-- <div mt-12 text-3>
            <p>连接MetaMask钱包，并签名验证后登录！
            </p>
        </div> -->
    </div>

</template>
 
<script setup>
import { NButton, createDiscreteApi } from "naive-ui"
import metamaskLog from '/metamask.svg'
let { message } = createDiscreteApi(["message"])
definePageMeta({
    layout:"logintem"
})

const clickFlag = ref(false)

const onSubmit = async ()=>{
    //先发送address, 获取nonce, 生成签名后发送后台，得到token
    clickFlag.value = true
    let signer = await metaMaskConn()
    if(signer == null){
        message.error("没有连上MetaMask钱包！", { duration: 5e3 })
        return
    }
    // console.log(123, "test singer:", signer, signer.address)
    let address = signer.address
    let option = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address
        })
    }
    let nonce = await getNonce('/metamaskapi/getnonce', option)
    // console.log(568, "nonce", nonce)
    // 签名消息
    let msg = `I am signing my one-time nonce: ${nonce}`
    let signature = await signer.signMessage(msg)
    // console.log(666, "signature", signature)
    let option2 = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address,
          signature
        })
    }
    await metalogin('/metamaskapi/metamasklogin', option2)
    clickFlag.value = false
} 
</script>