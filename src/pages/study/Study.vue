<template>
    <div class="study">
        <h2 class="study-nav">
            <ed-button class="study-nav-return" height="50px" @click="$router.go(-1)">返回</ed-button>
            第{{index}}章 {{catalogName}}
        </h2>
        <section class="study-content">
            <ul class="study-content-list">
                <li class="study-content-list-item" v-for="(item, index) in studyList" :key="index">
                    <div :id="`chapter${item.chapterId}`" v-if="item.courseContentType === 'CHAPTER'" class="study-content-list-item-sub_title">
                        {{item.content}}
                    </div>
                    <div :id="`content${item.contentId}`" v-if="item.courseContentType === 'TITLE'" class="study-content-list-item-title">{{item.content}}</div>
                    <div v-if="item.courseContentType === 'IMAGE'" class="study-content-list-item-image">
                        <img class="study-content-list-item-image-img" :src="`${imageUrl}${item.content}`" alt=""/>
                    </div>
                    <div :id="`chapter${item.chapterId}`" v-if="item.courseContentType === 'TEXT'" class="study-content-list-item-text"> {{item.content}}</div>
                    <answer v-if="item.courseContentType === 'ANSWER'" :answerItem="item" class="study-content-list-item-answer"/>
                </li>
            </ul>
            <span :style="{right: isShow ? '300px' : '150px'}" @click="isShow = !isShow" class="study-content-close">
                <img v-if="isShow" src="./../../assets/img/right.png" alt=""/>
                <img v-else src="./../../assets/img/left.png" alt=""/>
            </span>
            <div @click="handleMore" :style="{left: isShow ? '0px' : '150px'}" class="study-content-button">{{buttonText}}</div>
            <aside-catalog :studyList="studyList" v-show="isShow" class="study-content-aside"/>
        </section>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Answer from './Answer.vue';
import AsideCatalog from './AsideCatalog.vue';
import { getAlreadyInfo, getContentItem } from '@/api';
import EdButton from '@/components/button/Index.vue';
import url from '@/api/baseUrl.ts';
import $ from 'jquery';

@Options({
    components: { EdButton, Answer, AsideCatalog },
    data () {
        return {
            buttonText: '继续学习',
            imageUrl: url.imageUrl,
            isShow: true,
            index: this.$route.query.index,
            catalogName: this.$route.query.catalogName,
            studyList: []
        };
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            const { catalogId, courseId } = this.$route.query;
            getAlreadyInfo({catalogId, courseId}).then((res: any) => {
                if (res.code === 200) {
                    this.studyList = res.data.contentInfoList;
                    this.clickBottom();
                }
            });
        },
        handleMore() {
            if (this.buttonText === '完成课程') {
                this.$router.go(-1);
                return;
            }
            const { catalogId, courseId } = this.$route.query;
            const len = this.studyList.length;
            const { chapterId, contentId } = this.studyList[len - 1];
            getContentItem({catalogId, courseId, chapterId, contentId}).then((res: any) => {
                if (res.code === 200) {
                    if (res.data.contentInfoList.length === 0) {
                        // this.buttonText = '完成课程';
                    } else {
                        this.studyList = [...this.studyList, ...res.data.contentInfoList];
                    }
                    // window.scrollTo(0, document.documentElement.clientHeight);
                    this.clickBottom();
                }
            });
        },
        clickBottom() {
            let mainContainer = $('.study'),
            scrollToContainer = mainContainer.find('.study-content-item:last');
            //滚动到<div id="thisMainPanel">中类名为son-panel的最后一个div处
            //scrollToContainer = mainContainer.find('.son-panel:eq(5)');//滚动到<div id="thisMainPanel">中类名为son-panel的第六个处
            //非动画效果
            //mainContainer.scrollTop(
            //  scrollToContainer.offset().top - mainContainer.offset().top + mainContainer.scrollTop()
            //);
            //动画效果
            console.log(11, mainContainer, scrollToContainer.offset());
            mainContainer.animate({
                scrollTop: scrollToContainer.offset().top - mainContainer.offset().top
            }, 1000);//2秒滑动到指定位置
            // let h = $('.study-content-list').height()-$(window).height();
            // $(document).scrollTop(h); 
            // $('html, body').animate({scrollTop:$('.bottom').offset().top}, 400);
		}
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
        width: 1400px;
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
                font: 400 20px/2 '';
                letter-spacing: 2;
                padding: 20px;
                &-sub_title {
                    font: 500 30px/2 '';
                    color: $orangeFontColor;
                }
                &-title {
                    text-align: center;
                }

                &-image {
                    width: 100%;
                    height: 100%;
                    margin: 0 auto;
                }
                &-text {
                    font-size: 18px;
                    color: $formColor;
                    position: relative;
                }
                &-text::before {
                    content: '';
                    width: 2px;
                    height: 100%;
                    position: absolute;
                    left: -20px;
                    top: 0;
                    display: inline-block;
                    background: $orangeFontColor;
                }
            }
        }
        &-close {
            position: absolute;
            width: 40px;
            height: 50px;
            top: 48%;
            background: $orangeBackground;
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            img {
                width: 30px;
                height: 30px;
            }
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