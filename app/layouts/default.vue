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
    @apply  bg-sky-50 flex flex-col min-h-screen;
}
</style>