<template>
    <li class="item">
        <img class="item-img" :src="`${item.courseCoverImageUrl}`" alt=""/>
        <section class="item-content">
            <div class="item-content-name">
                <h3 class="item-content-name-title">{{item.courseName}}</h3>
                <p  class="item-content-name-tips">13章 | 324581人已经学习</p>
            </div>
            <p class="item-content-teacher">{{item.teacherName}} {{item.teacherDesc}}</p>
            <div class="item-content-desc">{{item.descContent}}</div>
            <div class="item-content-bottom">
                <div class="item-content-bottom-price">
                    <span class="item-content-bottom-price-sale">新人首单 ¥{{item.specialPrice}}</span>
                    <span class="item-content-bottom-price-origin">原价 ¥{{item.coursePrice}}</span>
                </div>
                <!-- 按钮 -->
                <ed-button @click="handleStudy(item.id)" type="dark">立即学习</ed-button>
            </div>
        </section>
    </li>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EdButton from '@/components/button/Index.vue';

@Options({
    name: 'ContentItem',
    components: { EdButton },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    methods: {
        handleStudy(courseId) {
            this.$router.push(`/?courseId=${courseId}`);
        }
    }
})

export default class ContentItem extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.item {
    display: flex;
    justify-content: space-between;
    height: 240px;
    box-sizing: border-box;
    &-img {
        background-color: red;
        width: 150px;
        height: 180px;
        border-radius: 8px;
        margin: 30px 0;
    }
    &-content {
        width: 600px;
        padding: 30px 0;
        height: 240px;
        border-bottom: 1px solid $inputBorderColor;
        &-name {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            &-title {
                font: 500 20px/24px '';
                color: $formColor;
            }
            &-tips {
                font: 300 14px/24px '';
                color: $tipsColor;
                white-space: nowrap;
                letter-spacing: 1px;
            }
        }
        &-teacher {
            font: 400 14px/24px '';
            text-indent: 5px;
            max-width: 100%;
            color: $formColor;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-bottom: 10px;
        }
        &-desc {
            font: 400 14px/24px '';
            height: 76px;
            text-indent: 20px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
        }
        &-bottom {
            height: 36px;
            margin-top: 8px;
            display: flex;
            justify-content: space-between;
            &-price {
                &-sale {
                    margin-right: 10px;
                    font: 400 18px/2 '';
                    color: $orangeFontColor;
                }
                &-origin {
                    font: 400 12px/3 '';
                    color: $tipsColor;
                    text-decoration: line-through;
                }
            }
        }
    }
}
</style>
