<template>
    <div>
        <HomeBar/>
        <router-view/>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HomeBar from '@/layout/HomeBar.vue';
@Options({
    components: { HomeBar }
})
export default class Layout extends Vue {};
</script>
<style lang="scss" scoped>
    
</style>
