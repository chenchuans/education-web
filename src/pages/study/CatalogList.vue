<template>
    <div class="catalog">
        <h2 class="catalog-title">
            <img class="catalog-title-img" :src="`${imageUrl}${courseInfo.courseCoverImageUrl}`"/>
            <h4>{{courseInfo.courseName}}</h4>
        </h2>
        <ul class="catalog-list">
            <li :class="['catalog-list-item', item.isHaveAuth ? '' : 'catalog-list-item_min']" v-for="(item, index) in catalogList" :key="index" @click="handleStudy(index, item)">
                <h3 class="catalog-list-item-title">第{{index + 1}}章 {{item.catalogName}}</h3>
                <!-- <p v-if="item.isHaveAuth" class="catalog-list-item-time">2020年11月2日</p> -->
                <footer v-if="item.isHaveAuth" class="catalog-list-item-footer">
                    <span class="catalog-list-item-footer-status">已完成{{item.rateOLearn}}%</span>
                    <ed-button type="dark" class="catalog-list-item-footer-button">{{item.rateOLearn === 100 ? '复习' : '继续学习'}}</ed-button>
                </footer>
            </li>
        </ul>
        <van-overlay :show="isOverlay">
            <div class="wrapper">
                <van-radio-group v-model="currentVersionId">
                    <van-radio v-for="(item, index) in versionList" :key="index" :name="item.id">{{item.versionName}}</van-radio>
                </van-radio-group>
                <ed-button @click="selectVersion" type="dark" class="bottom">确定</ed-button>
            </div>
        </van-overlay>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { getCatalogList, submitVersion } from '@/api';
import EdButton from '@/components/button/Index.vue';
import url from '@/api/baseUrl.ts';

@Options({
    components: { EdButton },
    data() {
        return {
            isOverlay: false,
            currentVersionId: 0,
            catalogList: [],
            imageUrl: url.imageUrl,
            courseInfo: {},
            versionList: []
        }
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            const { courseId } = this.$route.query;
            getCatalogList({ courseId }).then((res: any) => {
                if (res.code === 200) {
                    // 已经选择课程版本
                    if (res.data.isChoseVersion) {
                        this.catalogList = res.data.catalogInfoList;
                        this.courseInfo = res.data.courseInfo;
                    } else {
                        this.isOverlay = true;
                        this.versionList = res.data.courseVersionInfos;
                    }
                }
            });
        },
        selectVersion() {
            const {id, courseId} = this.versionList.find(item => item.id === this.currentVersionId);
            submitVersion({ versionId: id, courseId }).then((res: any) => {
                if (res.code === 200) {
                    this.getInfo();
                }
            });
        },
        handleStudy(index, {courseId, catalogId, isHaveAuth, catalogName}) {
            if (isHaveAuth) {
                const { courseName } = this.courseInfo;
                this.$router.push(`/study?courseId=${courseId}&catalogId=${catalogId}&courseName=${courseName}&catalogName=${catalogName}&index=${index + 1}`);
            }
        }
    }
})
export default class CatalogList extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.catalog {
    width: 1200px;
    margin: 0 auto;
    margin-top: 110px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 14px 2px $shadowColor;
    min-height: 300px;
    &-title {
        display: flex;
        justify-content: center;
        height: 70px;
        margin-bottom: 20px;
        &-img {
            width: 70px;
            height: 70px;
            display: inline-block;
            margin-right: 10px;
        }
        h4 {
            font: 500 26px/70px '';
        }
    }
    &-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 20px 10px 0 10px;
        width: 100%;
        &-item {
            min-height: 90px;
            box-sizing: border-box;
            width: 360px;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
            transition: all .5s;
            cursor: pointer;
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.15);
            &-title {
                font: 400 18px/1.5 '';
                margin-bottom: 10px;
            }
            &-time {
                font: 400 16px/20px '';
                padding: 10px 0;
                color: $tipsColor;
            }
            &-footer {
                display: flex;
                justify-content: space-between;
                &-status {
                    display: inline-block;
                    border: 1px solid $homeBarBorderColor;
                    color: $tipsColor;
                    border-radius: 5px;
                    height: 30px;
                    padding: 0 10px;
                    font: 14px/30px '';
                }
            }
        }
        &-item:hover {
            transform: scale(.95);
        }
        &-item_min {
            height: 70px;
            min-height: 30px;
            cursor: not-allowed;
            .catalog-list-item-title {
                color: $tipsColor;
            }
        }
        &-item_min:hover {
            transform: none;
        }
    }
    .wrapper {
        width: 400px;
        min-height: 100px;
        box-sizing: border-box;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        position: absolute;
        margin: -50px 0 0 -150px;
        left: 50%;
        top: 50%;
        text-align: center;
        .bottom {
            margin-top: 20px;
        }
    }
}
</style>
