<template>
<div px-10 pt-5>
   <div text-center>
    <h2>{{ user.username }}</h2> 
    <p mb-3>欢迎您回来， Joe竭诚为您服务！</p>
   </div>
   <div textBox>
    <div mb-4>积分余额： {{ balance }}</div>
    <div mb-4>邮箱： {{ user.email }}</div>
    <div mb-4>注册时间： {{ TimesToLocal(user.created) }}</div>
   </div>
</div>
</template>

<script setup>
definePageMeta({
  middleware:["auth"]
})
const token = useCookie('token')
const user = useCookie('user')
const balance = useCookie('balance')
</script>
