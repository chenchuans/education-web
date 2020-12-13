<template>
    <div class="course">
        <h2 class="course-title">我的课程</h2>
        <ul class="course-list">
            <li class="course-list-item" v-for="(item, index) in courseList" :key="index">
                <aside class="course-list-item-left">
                    <img class="course-list-item-left-img" :src="`${imageUrl}${item.courseCoverImageUrl}`" alt=""/>
                    <div class="course-list-item-left-content">
                        <h3 class="course-list-item-left-content-title">{{item.courseName}}</h3>
                        <p class="course-list-item-left-content-p">学完 {{item.rateOfLearningPercentage}}%</p>
                    </div>
                </aside>
                <ed-button type="dark" @click="handleStudy(item.courseId)" class="course-list-item-button">{{item.rateOfLearningPercentage === 100 ? '复习' : '继续学习'}}</ed-button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { getMyCourseInfo } from '@/api';
import url from '@/api/baseUrl.ts';
import EdButton from '@/components/button/Index.vue';

@Options({
    components: { EdButton },
    data() {
        return {
            imageUrl: url.imageUrl,
            courseList: []
        }
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            getMyCourseInfo({}).then((res: any) => {
                if (res.code === 200) {
                    this.courseList = res.data.infoList;
                }
            });
        },
        handleStudy(courseId) {
            this.$router.push(`/catalog-list?courseId=${courseId}`);
        }
    }
})
export default class CourseMy extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.course {
    width: 800px;
    margin: 0 auto;
    margin-top: 130px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 14px 2px $shadowColor;
    min-height: 300px;
    &-title {
        margin-bottom: 20px;
        font: 400 30px/1.5 '';
    }
    &-list {
        &-item {
            height: 130px;
            padding: 25px 0;
            margin: 0 20px;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(233,233,233,0.6);
            display: flex;
            justify-content: space-between;
            &-left {
                display: flex;
                &-img {
                    width: 70px;
                    height: 80px;
                    border-radius: 5px;
                    margin-right: 16px;
                    cursor: pointer;
                }
                &-content {
                    width: 400px;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    &-title {
                        font: 18px/22px '';
                        color: $fontColor;
                        cursor: pointer;
                    }
                    &-p {
                        font: 14px/22px '';
                        color: $tipsColor;
                    }
                }
            }
            &-button {
                margin-top: 20px;
            }
        }
    }

}
</style>
