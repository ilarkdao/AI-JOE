<template>
    <div class="navbar">
        <div class="containerX flex items-center h-16">
            <n-button text class="!text-xl" @click="backIndex">
                <img src="../assets/img/bot.png" mr-2 h-8 alt="AI·Joe" />
                 AI·Joe
            </n-button>
            <div class="menu">
                <div class="menu-item" :class="{ 'menu-item-active':isMenuItemActive(item) }"
                v-for="(item,index) in menus" :key="index"  @click="navTo(item.path)">
                    {{ item.name }}
                </div>
            </div>

            <!-- 用户信息 -->
            <div hidden lg:flex>
                <UserInfo />
            </div>
            <!-- 、用户信息 -->

            <!-- 手机端 -->
            <div class="ml-auto mr-2 bold lg:hidden" @click="activate('top')">
                <div class="i-mdi-dots-vertical" text-2xl/>
            </div> 

        </div>

        <!-- 手机弹出框-->
        <div
            id="drawer-target"
        >
        </div>
        <n-drawer
            v-model:show="active"
            :width="200"
            :height="300"
            :placement="placement"
            :trap-focus="false"
            :block-scroll="false"
            :mask-closable="true"
            to="#drawer-target"
        >  
            <n-drawer-content closable>
                <div mb-2 :class="{ 'menu-item-active':isMenuItemActive(item) }"
                v-for="(item,index) in menus" :key="index"  @click="navTo(item.path)">
                    {{ item.name }}
                </div>
                <!-- 用户中心，退出登录 -->
                <div mb-2 @click="userCenter" v-if="userObj">
                    用户中心
                </div>
                <div mb-2 @click="logout" v-if="userObj">
                    退出登录
                </div>
                <div class="flex lg:hidden">
                    <UserInfo />
                </div>
            </n-drawer-content>
        </n-drawer>
        <!-- /弹出框-->
    </div> 
</template>

<script setup>
import { createDiscreteApi } from "naive-ui"
const token = useCookie('token')
const userObj = useCookie('user')
const backIndex = () => { navigateTo('/') }

//菜单切换
const active = ref(false)
const placement = ref("top")
const activate = (place) => {
    active.value = true
    placement.value = place
}

const route = useRoute()
const menus = [{
    name:"问道",
    path:"/"
},{
    name:"角色",
    path:"/role"
},{
    name:"图像",
    path:"/image"
},{
    name:"设计",
    path:"/design/portrait"
},{
    name:"读图",
    path:"/vision/ask"
}]

const navTo = path => navigateTo(path)
const isMenuItemActive = item => route.path == item.path 
const userCenter = () => navigateTo('/user/info')
const logout = () => {
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
    })    
}
</script>

<style>
.navbar {
    @apply bg-white  shadow-sm;
}
.menu {
    @apply hidden lg:(flex m-auto);
}
.menu-item {
    transition: all 0.2s;
    @apply px-2 py-1 mx-1 rounded cursor-pointer hover:bg-blue-100 hover:text-blue-700 active:!bg-blue-200;
}
.menu-item-active {
    @apply !bg-blue-100 lg:!bg-transparent !text-blue-600;
}
</style>
