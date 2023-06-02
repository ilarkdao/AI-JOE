<template>
    <div class="pt-[50px]">
        <n-result
            status="500"
            title="错误提示"
            :description="error.message"
        >
            <template #icon>
                <img src="./assets/img/robot.png" alt="ai joe">
            </template>
            <template #footer>
                <n-button @click="$router.back()" mr-4>返回上一页</n-button>
                <n-button @click="handleError">回到首页</n-button>
            </template>
        </n-result>
    </div>
</template>

<script setup>
defineProps({
  error: Object
})
const handleError = () => clearError({ redirect: '/' })
</script>