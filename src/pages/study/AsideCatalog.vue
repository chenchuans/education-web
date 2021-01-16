<template>
    <aside class="catalog">
        <h4 class="catalog-title">{{courseName}}</h4>
        <h5 class="catalog-sub_title">目录引导 <span>(已学习{{rateOLearn}}%)</span></h5>
        <ul class="catalog-list">
            <li class="catalog-list-item" v-for="(item, index) in chapterList" :key="index">
                <h6 :class="['catalog-list-item-title', !chapterIdList.includes(item.chapterId) ? 'no-click' : '', currentClickId === item.chapterId ? 'current-click' : '']" @click="handleChapter(item)">
                    {{index + 1}}. {{item.chapterName}}</h6>
                <p v-for="(it, i) in item.contentTitleList" @click="handleContent(it)" :class="['catalog-list-item-p', !contentIdList.includes(it.contentId) ? 'no-click' : '', currentClickId === it.contentId ? 'current-click' : '']">{{index + 1}}-{{i + 1}}. {{it.contentText}}</p>
            </li>
        </ul>
        <h5 class="catalog-sub_title" v-if="courseInfo.materialsName">资料下载</h5>
        <div class="catalog-card" v-if="courseInfo.materialsName">
            <h3 class="catalog-card-title">{{courseInfo.materialsName}}</h3>
            <a :href="`${imageUrl}${courseInfo.materialsUrl}`" :download="courseInfo.materialsUrl" class="catalog-card-click">点击下载</a>
        </div>
    </aside>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { getCatalogDetail } from '@/api';
import url from '@/api/baseUrl.ts';
import $ from 'jquery';
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
            currentClickId: 0,
            imageUrl: url.imageUrl,
            courseName: this.$route.query.courseName
        };
    },
    watch: {
        studyList(value) {
            let contentIdList = [];
            let chapterIdList = [];
            this.studyList.forEach(({chapterId, contentId}) => {
                chapterIdList.push(chapterId);
                contentIdList.push(contentId);
            });
            this.chapterIdList = Array.from(new Set(chapterIdList));
            this.contentIdList = Array.from(contentIdList);
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
        handleChapter({chapterId}) {
            if (!this.chapterIdList.includes(chapterId)) {
                return;
            }
            this.rightClick(`#chapter${chapterId}`, chapterId);
        },
        handleContent({contentId}) {
            if (!this.contentIdList.includes(contentId)) {
                return;
            }
            this.rightClick(`#content${contentId}`, contentId);
        },
        rightClick(idName, id) {
            if (this.currentClickId === id) {
                return;
            }
            this.currentClickId = id;
			const top  = $(idName).offset().top;
            $('html, body .study-content-list').animate({
                'scrollTop': top
            }, 1000);
		}
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
        text-align: left;
        font-size: 14px;
        line-height: 30px;
    }
    &-sub_title {
        padding: 20px 0;
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
        span {
            font-size: 14px;
        }
    }
    &-list {
        &-item {
            &-title {
                font-size: 16px;
                line-height: 30px;
                height: 30px;
                padding-left: 20px;
                cursor: pointer;
            }
            &-p {
                font-size: 14px;
                line-height: 30px;
                height: 30px;
                padding-left: 40px;
                width: 260px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
            }
            &-title:hover {
                color: $orangeFontColor;
            }
            &-p:hover {
                color: $orangeFontColor;
            }
            .current-click {
                color: $orangeFontColor;
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
            font-size: 16px;
            line-height: 30px;
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
    .no-click {
        cursor: not-allowed;
        color: $tipsColor;
    }
}
</style>
