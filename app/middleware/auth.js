export default defineNuxtRouteMiddleware((to,from)=>{
    const user = useCookie('user')
    if(!user.value){
        // console.log(544, "请先登录！")
        return navigateTo('/login')
    }
})