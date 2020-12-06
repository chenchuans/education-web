<template>
    <div class="home">
        <!-- <home-bar/>
        <router-view></router-view> -->
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HomeBar from "@/layout/HomeBar.vue";

@Options({
    components: {
        HomeBar
    }
})
export default class Home extends Vue {}
</script>
