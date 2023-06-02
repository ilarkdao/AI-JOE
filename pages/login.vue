<template>
    <h4 pb-4 text-xl text-gray-500 text-center> 登录 </h4>
    <n-form w-80 block outline-none ref="formRef" :model="form" :rules="rules" size="large">
        <n-form-item :show-label="false" path="username">
            <n-input v-model:value="form.username" placeholder="用户名"/>
        </n-form-item>
        <n-form-item :show-label="false" path="password">
            <n-input v-model:value="form.password" placeholder="密码" type="password"/>
        </n-form-item>
        <div flex justify-between w-full mb-2>
            <!-- <nuxt-link to="/forget">
                <n-button quaternary type="primary" size="small">忘记密码？</n-button>
            </nuxt-link> -->
            <nuxt-link to="/register">
                <n-button quaternary type="primary" size="small">注册</n-button>
            </nuxt-link>
        </div>
        <div mb-4>
            <n-button block type="primary" @click="onSubmit" :loading="clickFlag">
                登 录
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
const route = useRoute()

const formRef = ref(null)
const form = reactive({
    username:"",
    password:"",
})
const rules = computed(()=>{
    return {
        username:[{
            required: true,
            message: '用户名必填！',
            trigger: ["blur"]
        }],
        password:[{
            required: true,
            message:"密码必填！"
        }]
    }
})
const clickFlag = ref(false)

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
    await loginApi('/userapi/login', option)
    clickFlag.value = false
}
</script>