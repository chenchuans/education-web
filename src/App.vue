<template>
    <div id="app">
       <router-view/>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.page {
    width: 1200px;
    margin: 0 auto;
    padding-top: 70px;
    background-color: $white;
}
</style>
