<template>
<h4 pb-4 text-xl text-gray-500 text-center> 注册 </h4>
<n-form w-80 block outline-none ref="formRef" :model="form" :rules="rules" size="large">
    <n-form-item :show-label="false" path="username">
        <n-input v-model:value="form.username" placeholder="用户名，可以中英文、数字、下划线，减号"/>
    </n-form-item>
    <n-form-item :show-label="false" path="password">
        <n-input v-model:value="form.password" placeholder="密码，最少6位" type="password"/>
    </n-form-item>
    <n-form-item :show-label="false" path="repassword">
        <n-input v-model:value="form.repassword" placeholder="确认密码" type="password"/>
    </n-form-item>
    <n-form-item :show-label="false" path="email">
        <n-input v-model:value="form.email" placeholder="电子邮箱， 比如：45897584@qq.com"/>
    </n-form-item>

    <n-button secondary mb-4 type="info" @click="createCaptcha">
        获取/刷新 验证码 
        </n-button> <span text-rose v-if="capture">有效期：5分钟</span>
    <n-form-item :show-label="false" path="captureData" v-if="capture">
        <div v-html="capture" mr-2></div>
        <n-input v-model:value="form.captureData" placeholder="验证码" />
    </n-form-item>
    
    <div mt-1>
        <n-button block type="primary" @click="onSubmit" :loading="clickFlag">
            注 册
        </n-button>
    </div>
</n-form>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
let { message } = createDiscreteApi(["message"])

definePageMeta({
    layout:"logintem"
})

const formRef = ref(null)
const form = reactive({
    username:"",
    password:"",
    repassword:"",
    email:"",
    captureData:"" 
})

const rules = computed(()=>{
    return {
        username:[{
            required: true,
            message: '用户名必填！'
        },{
            validator(rule, value) {
                let reg = /^[a-zA-Z0-9-_\u4e00-\u9fa5]{2,16}$/ 
                return reg.test(value)
            },
            message:"用户名不规范，请改写！",
        }],
        password:[{
            required: true,
            message:"密码必填！"
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
                return value === form.password
            },
            message:"两次密码输入不一致",
            trigger: ["input", "blur"]
        }],
        email:[{
            required: true,
            message:"邮箱必填！"
        },{
            validator(rule, value) {
                let ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                return ePattern.test(value)
            },
            message:"请填入正确的邮箱！"
        }]
    }
})

/*
1.在服务器端生成验证码和token(jwt 5min)
2.注册时在服务端验证 验证码和token，正确则下一步
*/
let capture = ref('')
let captchaToken = ref('')
const createCaptcha = async () => {
    let s = await getCaptcha("/userapi/getcaptcha")
    capture.value = s.data.value.data
    captchaToken.value = s.data.value.token
}

let clickFlag = ref(false)
const onSubmit = async ()=>{
    await formRef.value.validate()  //表格验证
    if(form.captureData == '' || form.captureData.length != 6){
        message.error("请填入正确的验证码！", { duration: 5e3 })
        return  
    }
    clickFlag.value = true 

    let option = {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + captchaToken.value
        },
        body: JSON.stringify(form)
    }
    await registerApi('/userapi/register', option)
    clickFlag.value = false
}
</script>