<template>
    <aside class="catalog">
        <h4 class="catalog-title">{{courseName}}</h4>
        <h5 class="catalog-sub_title">目录引导 <span>(已学习{{rateOLearn}}%)</span></h5>
        <ul class="catalog-list">
            <li class="catalog-list-item" v-for="(item, index) in chapterList" :key="index">
                <h6 class="catalog-list-item-title">{{index + 1}}. {{item.chapterName}}</h6>
                <p v-for="(it, i) in item.contentTitleList" class="catalog-list-item-p">
                    {{index + 1}}-{{i + 1}}. {{it.contentText}}</p>
            </li>
        </ul>
        <h5 class="catalog-sub_title" v-if="courseInfo.materialsName">资料下载</h5>
        <div class="catalog-card" v-if="courseInfo.materialsName">
            <h3 class="catalog-card-title">{{courseInfo.materialsName}}</h3>
            <span class="catalog-card-click">点击下载</span>
        </div>
    </aside>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { getCatalogDetail } from '@/api';
import url from '@/api/baseUrl.ts';
// chapterId contentId
@Options({
    props: {
        studyList: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            chapterList: [],
            courseInfo: {},
            rateOLearn: 0,
            chapterIdList: [],
            contentIdList: [],
            imageUrl: url.imageUrl,
            courseName: this.$route.query.courseName
        };
    },
    watch: {
        studyList(value) {

            // console.log(11, new Proxy(value));
            // value[1].forEach(({chapterId, contentId}) => {
            //     this.chapterIdList.push(chapterId);
            //     this.contentIdList.push(contentId);
            // });
            // console.log(111, this.chapterIdList, this.contentIdList);
        }
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            const { catalogId, courseId } = this.$route.query;
            getCatalogDetail({catalogId, courseId}).then((res: any) => {
                if (res.code === 200) {
                    this.chapterList = res.data.chapterInfoList;
                    this.courseInfo = res.data.courserMaterials;
                    this.rateOLearn = res.data.rateOLearn;
                }
            });
        },
    }
})
export default class Catalog extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.catalog {
    padding: 50px 20px;
    box-sizing: border-box;
    color: #333;
    &-title {
        font: 14px/30px '';
        text-align: left;
    }
    &-sub_title {
        padding: 20px 0;
        font: 500 20px/30px '';
        span {
            font-size: 14px;
        }
    }
    &-list {
        &-item {
            &-title {
                font: 400 16px/30px '';
                height: 30px;
                padding-left: 20px;
                cursor: pointer;
            }
            &-p {
                font: 400 14px/30px '';
                height: 30px;
                padding-left: 40px;
                width: 260px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
            }
        }
    }
    &-card {
        width: 100%;
        height: 80px;
        padding: 10px;
        border-radius: 5px;
        background-color: $orangeCardColor;
        position: relative;
        cursor: pointer;
        &-title {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font: 400 16px/30px '';
            padding-bottom: 10px;
            text-indent: 10px;
        }
        &-click {
            float: right;
            font-size: 14px;
            color: $orangeFontColor;
        }
    }
    &-card::before {
        content: '';
        width: 6px;
        height: 100%;
        border-radius: 5px 0 0 5px;
        position: absolute;
        left: 0;
        top: 0;
        display: inline-block;
        background: $orangeFontColor;
    }
}
</style>
