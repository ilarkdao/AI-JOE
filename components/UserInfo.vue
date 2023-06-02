<template>
    <!-- <div class="w-[100%] h-[80px]"></div> -->
    <div flex justify-center items-center>
        <a target="_blank" href="https://github.com/ilarkdao" text-gray-700>
            <div class="i-mdi-github" text-2xl mr-3 />
        </a>
        <!-- <div class="i-mdi-wechat" text-2xl mr-3 /> -->
        <a target="_blank" href="https://twitter.com/ilark_dao" text-gray-700>
            <div class="i-mdi-twitter" text-2xl mr-3 />
        </a> 
        <a target="_blank" href="https://www.douyin.com/user/MS4wLjABAAAAo4NuHKEIjKXGe52mKF6MYWjLAFCQ5amLjyp2lsXs4rAeOb8wq_PeAq0duYVh43Ya" text-gray-700>
            <img :src="tiktok" h-6 align-middle mr-3 alt="ai joe tiktok" > 
        </a> 
        <nuxt-link to="/question"  text-gray-700>
            <div class="i-mdi-progress-question" text-2xl mr-3 />
        </nuxt-link>
        
        <nuxt-link to="/register" v-if="!userObj"  mr-2>
            <n-button secondary strong>注册</n-button>
        </nuxt-link>
        <nuxt-link to="/login" v-if="!userObj">
            <n-button secondary strong>登录</n-button>
        </nuxt-link>
        
        <n-dropdown v-else :options="userOptions" @select="handleSelect">
            <img :src="user" h-6 align-middle mr-3 alt="ai joe user" >
        </n-dropdown>

    </div>
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
import user from "@/assets/img/user.svg"
import tiktok from "@/assets/img/tiktok.svg"
const token = useCookie('token')
const userObj = useCookie('user')
const balance = useCookie('balance', {maxAge: 60 * 60 * 6})  //6小时 
if(token.value){
    let { data, error } = await getHttp('/getBalance', token.value)
    balance.value = data.value?.balance
}

let userOptions = [
{
    label: "余额："+balance.value,
    key: "balanceX",
},
{
    label: "用户中心",
    key: "center",
},
{
    label: "退出",
    key: "logout",
}]
const handleSelect = (k)=>{
    console.log(k)
    switch (k) {
        case "balanceX":
            navigateTo({
                path:"/user/pay"
            })
            break;
        case "logout":
            const { dialog } = createDiscreteApi(["dialog"])
            dialog.warning({
                content: "是否要退出登录？",
                positiveText: "退出",
                negativeText: "取消",
                onPositiveClick: async () => {
                    console.log(444)
                    userObj.value = null  
                    token.value = null
                    //刷新页面
                    // let router = useRouter()
                    // router.go(0)
                    navigateTo("/login")
                },
            });
            break;
        case "center":
            navigateTo({
                path:"/user/info"
            })
            break;
    }
}
</script>