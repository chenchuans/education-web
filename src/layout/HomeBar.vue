<template>
    <div class="home-bar">
        <header class="home-bar-wrapper">
            <ul class="home-bar-wrapper-menu">
                <li :class="currentRoute === item.path ? 'select-item' : ''" v-for="(item, index) in routeList" :key="index" class="home-bar-wrapper-menu-item" @click="toRouteLink(item)">{{item.name}}</li>
            </ul>
            <div class="login">
                <span class="login-user" v-show="userInfo.userName">用户名: {{userInfo.userName}}</span>
                <ed-button @click="handleLogin" class="login-button">{{loginStatus}}</ed-button>
            </div>
        </header>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EdButton from '@/components/button/Index.vue';
import { getUsername, removeUid, removeToken, removeUsername } from '@/libs/session';

@Options({
    components: { EdButton },
    data() {
        return {
            routeList: [
                {name: '首页', path: '/home'},
                {name: '我的课程', path: '/course-my'},
                {name: '我的订单', path: '/order-my'},
            ],
            currentRoute: this.$route.path || '/home',
            loginStatus: getUsername() ? '退出' : '登录',
            userInfo: {
                userName: getUsername()
            }
        }
    },
    created() {
        // if (getUsername()) {
        //     this.routeList =  [ concat
        //         {name: '首页', path: '/home'},
        //         {name: '我的课程', path: '/course-my'},
        //         {name: '我的订单', path: '/order-my'},
        //     ];
        // } else {
        //      this.routeList =  [{name: '首页', path: '/home'}];
        // }
    },
    methods: {
        toRouteLink(item) {
            this.$router.push(item.path);
            this.currentRoute = item.path;
        },
        handleLogin() {
            // 登录或者退出登录
            if (getUsername()) {
                removeUid();
                removeToken();
                removeUsername();
            }
            this.$router.push('/login');
        }
    }
})
export default class HomeBar extends Vue {

}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.home-bar {
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: $white;
    border-bottom: 1px solid $homeBarBorderColor;
    font-size: 16px;
    line-height: 70px;
    &-wrapper {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
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
                color: $orangeFontColor;
                font-weight: 500;
            }
        }
        .login {
            &-user {
                margin-right: 30px;
            }
            &-button {
                margin: 20px 0;
            }
        }
    }
}
</style>
