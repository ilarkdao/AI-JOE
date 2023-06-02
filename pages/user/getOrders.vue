<template>
<div px-2 lg:px-20 pt-5>
   <div text-center>
    <h2>用户充值记录</h2>   
   </div>
   <div v-for="(item,index) in history" :key="index" border-dashed border-1 text-3.2 mb-2>
      <div>id： {{ item.user_id }}</div>  
      <div>充值方式： {{ item.pay_method }}</div>
      <div>充值帐户： {{ item.pay_account }}</div>
      <div>充值金额：￥{{ item.amount }}</div>
      <div v-if="item.finished">完成时间： {{ TimesToLocal(item.finished) }}</div>
      <div v-else>
        <div>创建时间： {{ TimesToLocal(item.created) }}</div>
        完成状态：尚在进行中...
      </div>
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

const history = ref(null)
//获取订单
const getHistory = async () => {
  let { data,  error } = await getHttp('/pay/userorders', token.value)
  if(error.value) {
    // console.log(444, errorX.value)
    message.error("查找失败！\n"+error.value.data, { duration: 5e3 })
    return
  }
  history.value = data.value.payhistory
}
getHistory()

</script>
