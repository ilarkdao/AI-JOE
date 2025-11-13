<template>
    <div class="body">
        <NavBar/>      
        <main class="containerX"> 
            <slot/>
        </main>
    </div>
</template>
<style>
.body {
    color:#787878;
    @apply  bg-gray-50 flex flex-col min-h-screen;
    /* @apply  bg-sky-50 flex flex-col min-h-screen; */
}
</style>