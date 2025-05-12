<template>
    <div w-full mx-auto text-3.6 lg:w-60vw> 
        <n-grid x-gap="20" cols="16" item-responsive responsive="screen">
            <n-grid-item span="1 l:3" >
                <!-- 手机端 -->
                <div class="i-mdi-chevron-double-right text-2xl" 
                    mt-20 block lg:hidden  
                    text-gray-600 
                    @click="activate('left')"
                />

                <ul class="center-menu" hidden lg:block>
                    <li :class="{'active':(item.path == activeName)}" 
                    v-for="(item,index) in menus" :key="index"
                    @click="navigate(item)">
                        {{ item.title }}
                    </li>
                </ul>
            </n-grid-item>
            <n-grid-item span="15 l:13">
                <div bg-white rounded-3 mt-4.5 min-h-86vh>
                    <NuxtPage />
                </div>
            </n-grid-item>
        </n-grid>

        <!-- 手机弹出框-->
        <div
        id="drawer-target"
        >
        </div>
        <n-drawer
            v-model:show="active"
            :width="200"
            :height="200"
            :placement="placement"
            :trap-focus="false"
            :block-scroll="false"
            to="#drawer-target"
        >  
        <n-drawer-content closable>
            <ul class="center-menu">
                <li :class="{'active':(item.path == activeName)}" 
                v-for="(item,index) in menus" :key="index"
                @click="navigate(item)">
                    {{ item.title }}
                </li>
            </ul>
        </n-drawer-content>
        </n-drawer>
        <!-- /弹出框-->
    </div>
</template>

<script setup>
// definePageMeta({
//     middleware:["auth"]
// })
useHead({
  title:"设计"
})
const route = useRoute()
const activeName = computed(()=>route.path)
//菜单切换
const active = ref(false)
const placement = ref("left")
const activate = (place) => {
    active.value = true
    placement.value = place
}

const menus = [{
    title:"风格头像",
    path:"/design/portrait"
},{
    title:"表情包",
    path:"/design/emoji"
},{
    title:"标志设计",
    path:"/design/logo"
},{
    title:"海报设计",
    path:"/design/poster"
},{
    title:"插画设计",
    path:"/design/illustration"
},{
    title:"产品草图渲染",
    path:"/design/product"
}]

const navigate = (item) => {
    navigateTo({  path: item.path })
}
</script>

<style>
.center-menu {
    @apply list-none bg-white rounded-3;
}
.center-menu li {
    @apply  py-3 text-sm cursor-pointer hover:( bg-blue-50);
}
.center-menu .active {
    @apply font-bold text-blue-400 bg-gray-100;
}
</style>