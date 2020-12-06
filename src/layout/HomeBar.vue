<template>
    <div class="home-bar">
        <header class="home-bar-wrapper">
            <ul class="home-bar-wrapper-list">
                <li class="home-bar-wrapper-item"></li>
            </ul>
        </header>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    components: {
    },
    data() {
        return {
            routeList: [
                {name: '首页', route: '/'},
                {name: '我的课程', route: ''},
                {name: '个人中心', route: ''},
            ]
        }
    },
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
@import url('./../styles/variables');
.home-bar {
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    background-color: #fff;
    border-bottom: 1px solid $homeBarBorderColor;
    &-wrapper {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        &-list {

        }
        &-item {
            
        }
    }
}
</style>
