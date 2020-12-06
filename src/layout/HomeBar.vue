<template>
    <div class="home-bar">
        <header class="home-bar-wrapper">
            <ul class="home-bar-wrapper-menu">
                <li :class="currentRoute === item.path ? 'select-item' : ''" v-for="(item, index) in routeList" :key="index" class="home-bar-wrapper-menu-item" @click="toRouteLink(item)">{{item.name}}</li>
            </ul>
            <div class="login">
                <span class="login-user">用户名: {{userInfo.userName}}</span>
                <ed-button class="login-button">{{loginStatus}}</ed-button>
                <!-- <span class="login-button">{{loginStatus}}</span> -->
            </div>
        </header>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EdButton from '@/components/button/Index.vue';

@Options({
    components: { EdButton },
    data() {
        return {
            routeList: [
                {name: '首页', path: '/home'},
                {name: '我的课程', path: '/content-my'},
                {name: '个人中心', path: '/user-center'},
            ],
            currentRoute: this.$route.path || '/home',
            loginStatus: '登录',
            userInfo: {
                userName: '沉船'
            }
        }
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
    font: 400 16px/70px '';
    &-wrapper {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        &-menu {
            display: flex;
            height: 70px;
            width: 400px;
            align-items: center;
            &-item {
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
        .login {
            &-user {
                // font: 400 16px/70px '';
                margin-right: 30px;
            }
            &-button {
                margin: 20px 0;
                // width: 90px;
                // display: inline-block;
                // height: 30px;
                // line-height: 30px;
                // border: 1px solid $fontColor;
                // color: $fontColor;
                // text-align: center;
                // border-radius: 5px;
            }
        }
    }
}
</style>
