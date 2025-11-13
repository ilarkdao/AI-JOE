<template>
    <div min-h-screen bg-white lg:bg-gray-100>
            <n-grid x-gap="20" cols="18" item-responsive responsive="screen" text-3.2>
                <n-grid-item span="0 l:8">
                    <img src="https://img.ilark.io/img/202511/1762351376690-1dz94.jpg" alt="ai joe">
                </n-grid-item>
                <n-grid-item span="18 l:10" min-h-screen flex justify-center items-center>
                    <div shadow-lg rounded-lg p-5 bg-white>
                        <slot/>
                    </div>
                </n-grid-item>
            </n-grid>
    </div>
</template>
<script setup>
import {NGrid, NGridItem } from "naive-ui"
</script>