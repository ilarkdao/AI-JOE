<template>
<div px-2 lg:px-20 pt-5>
   <div text-center>
    <h2>创建充值订单</h2> 
   </div>
   <div flex mb-4 h-6 items-center justify-between> 
      <p>选择充值金额：</p>
      <n-space w-52vw lg:w-25vw>
        <n-radio
          :checked="checkedNum === '50'"
          value="50"
          name="basic-demo"
          @change="handleChange"
        >
          ￥50
        </n-radio>
        <n-radio
          :checked="checkedNum === '100'"
          value="100"
          name="basic-demo"
          @change="handleChange"
        >
          ￥100
        </n-radio>
        <n-radio
          :checked="checkedNum === '200'"
          value="200"
          name="basic-demo"
          @change="handleChange"
        >
          ￥200
        </n-radio>              
      </n-space>
   </div>
   <div w-52vw lg:w-25vw>
     <div mb-4>充值方式： {{ payMethod?.pay_method }}</div>
     <div mb-4>充值帐户： {{ payMethod?.pay_account }}</div>
   </div>

   <n-button block mt-4 items-center type="primary" @click="submit">
     确定充值
   </n-button> 
   <div text-3>
      <p>注：￥1 = 400 积分</p> 
      <p>积分到帐会略有延迟</p>
      <p>如积分超24小时还未到帐，则请反馈</p>
   </div>

    <!-- <n-button block mt-4 items-center type="primary" @click="getOrder">
     查询订单
   </n-button>  -->

</div>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
let { message } = createDiscreteApi(["message"])
const token = useCookie('token')
definePageMeta({
  middleware:["auth"]
})

const payMethod = useCookie('payMethod') 
if(!payMethod.value){
  console.log(233, payMethod.value)
  let { data,  error } = await getHttp('/pay', token.value)
  if(error.value) {
    console.log(444, error.value)
    message.error("失败！\n"+error.value)
  }
  //将充值方式存入cookie
  
  payMethod.value = data.value.paymethod
  console.log(666, payMethod.value)
}

//充值金额
const checkedNum = ref('50')
const handleChange = (e) => {
  console.log(e.target.value)
  checkedNum.value = e.target.value
}

const submit = async () => {
  let body = {
    method: payMethod.value.pay_method,
    account: payMethod.value.pay_account,
    amount: checkedNum.value
  }
  let { data,  error } = await postHttp('/pay/createorder', body, token.value)
  if(error.value) {
    console.log(444, error.value)
    message.error("失败！\n"+error.value.data, { duration: 5e3 })
    return
  }
  message.success("创建订单成功！", { duration: 5e3 })
  navigateTo('/user/paidOrder')

}
</script>
