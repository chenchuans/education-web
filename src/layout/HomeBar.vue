<template>
    <div class="home-bar">
        <header class="home-bar-wrapper">
            <ul class="home-bar-wrapper-menu">
                <li :class="currentRoute === item.path ? 'select-item' : ''" v-for="(item, index) in routeList" :key="index" class="home-bar-wrapper-menu-item" @click="toRouteLink(item)">{{item.name}}</li>
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
                {name: '首页', path: '/home'},
                {name: '我的课程', path: '/content-my'},
                {name: '个人中心', path: '/user-center'},
            ],
            currentRoute: this.$route.path || '/home'
        }
    },
    created() {
        console.log(111, this.$route.path);
    },
    methods: {
        toRouteLink(item) {
            this.$router.push(item.path);
            this.currentRoute = item.path;
        }
    }
})
export default class HomeBar extends Vue {

}
</script>
<style lang="scss" scoped>
// @import url('../styles/variables.scss');
// $homeBarBorderColor
$fontColor: #fa8919;
$orangeBackground: #fbf5ee;
$homeBarBorderColor: #eaeaea;
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
        &-menu {
            display: flex;
            height: 70px;
            align-items: center;
            &-item {
                font: 400 16px/70px '';
                margin: 0 20px;
                transition: color .2s ease;
                white-space: nowrap;
                cursor: pointer;
            }
            .select-item {
                color: $fontColor;
                font-weight: 500;
            }
        }
    }
}
</style>
