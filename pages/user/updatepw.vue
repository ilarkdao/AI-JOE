<template>
<div px-10 pt-5>
   <h4 pb-4 text-xl text-gray-500 text-center> 修改密码 </h4>
   <n-form w-80 block outline-none mx-auto ref="formRef" :model="form" :rules="rules" size="large">
    <n-form-item :show-label="false" path="username" >
        <n-input v-model:value="form.username" disabled placeholder="用户名"/>
    </n-form-item>
    <n-form-item :show-label="false" path="password">
        <n-input v-model:value="form.password" placeholder="原始密码" type="password"/>
    </n-form-item>
    <n-form-item :show-label="false" path="newpassword">
        <n-input v-model:value="form.newpassword" placeholder="新密码，最少6位" type="password"/>
    </n-form-item>
    <n-form-item :show-label="false" path="repassword">
        <n-input v-model:value="form.repassword" placeholder="确认密码" type="password"/>
    </n-form-item>

    <div>
        <n-button block type="primary" @click="onSubmit" :loading="clickFlag">
            确认修改
        </n-button>
    </div>
</n-form>
</div>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
let { message } = createDiscreteApi(["message"])
definePageMeta({
  middleware:["auth"]
})
const user = useCookie('user')
const formRef = ref(null)
const form = reactive({
    username:"",
    password:"",
    newpassword:"",
    repassword:""
})
form.username = user.value.username
const rules = computed(()=>{
    return {
        password:[{
            required: true,
            message:"旧密码必填！"
        },{
            validator(rule, value) {
                return value.length >= 6
            },
            message:"密码长度要大于6！",
        }],
        newpassword:[{
            required: true,
            message:"新密码必填！"
        },{
            validator(rule, value) {
                return value.length >= 6
            },
            message:"密码长度要大于6！",
        }],
        repassword: [{
            required: true,
            message:"确认密码必填！"
        },{
            validator(rule, value) {
                return value === form.newpassword
            },
            message:"两次密码输入不一致",
            trigger: ["input", "blur"]
        }],
        
    }
})

let clickFlag = ref(false)
const onSubmit = async ()=>{
    await formRef.value.validate()  //表格验证
    clickFlag.value = true 

    let option = {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    }
    await updatepw('/userapi/updatepw', option)
    clickFlag.value = false
}
</script>
