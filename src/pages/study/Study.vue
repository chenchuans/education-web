<template>
    <div class="study">
        <h2 class="study-nav">
            <ed-button class="study-nav-return" height="50px" @click="$router.go(-1)">返回</ed-button>
            第{{index}}章 {{catalogName}}
        </h2>
        <section class="study-content">
            <ul class="study-content-list">
                <li class="study-content-list-item"></li>
            </ul>
            <span :style="{right: isShow ? '300px' : '150px'}" @click="isShow = !isShow" class="study-content-close">关闭</span>
            <div :style="{left: isShow ? '0px' : '150px'}" class="study-content-button">{{buttonText}}</div>
            <aside-catalog v-show="isShow" class="study-content-aside"/>
        </section>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Answer from './components/Answer.vue';
import Content from './components/Content.vue';
import Title from './components/Title.vue';
import Image from './components/Image.vue';
import AsideCatalog from './components/AsideCatalog.vue';
// import { getCourseDetail } from '@/api';
import EdButton from '@/components/button/Index.vue';

@Options({
    components: { EdButton, Answer, Content, Title, Image, AsideCatalog },
    data () {
        return {
            buttonText: '继续学习',
            isShow: true,
            index: this.$route.query.index,
            catalogName: this.$route.query.catalogName
        };
    },
    created() {
        // this.getInfo();
    },
    methods: {
        getInfo() {

        },
    }
})
export default class Study extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.study {
    width: 100%;
    height: 100%;
    &-nav {
        height: 50px;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        background: #fff;
        border-bottom: 1px solid $homeBarBorderColor;
        font: 400 20px/50px '';
        text-align: center;
        &-return {
            border: none;
            float: left;
            font: 400 20px/50px '';
        }
    }
    &-content {
        width: 1500px;
        margin: 0 auto;
        box-sizing: border-box;
        height: 100vh;
        display: flex;
        position: relative;
        justify-content: center;
        transition: all .5s;
        &-list {
            width: 1200px;
            height: 100vh;
            overflow: scroll;
            box-sizing: border-box;
            padding: 80px 0;
            transition: all .5s;
            &-item {

            }
        }
        &-close {
            position: absolute;
            width: 40px;
            height: 50px;
            top: 48%;
            background: $orangeBackground;
            z-index: 2;
            cursor: pointer;
        }
        &-button {
            width: calc(100% - 300px);
            height: 50px;
            position: absolute;
            bottom: 0;
            font: 500 20px/50px '';
            background-color: $orangeFontColor;
            color: #fff;
            text-align: center;
            cursor: pointer;
        }
        &-aside {
            width: 300px;
            height: 100vh;
            transition: all .5s;
            background-color: $orangeBagColor;
        }
    }
}
</style>
<style>
body {
    margin: 0 !important;
}
</style>