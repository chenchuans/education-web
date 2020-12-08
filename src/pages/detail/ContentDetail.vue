<template>
    <div class="page detail">
        <content-detail-item :isDetail="true" class="detail-item" :item="item"/>
        <section class="detail-catalog">
            <h2 class="detail-catalog-title">课程介绍</h2>
            <div class="detail-catalog-content">{{item.descContent}}</div>
        </section>
        <section class="detail-catalog">
            <h2 class="detail-catalog-title">课程目录</h2>
            <ul class="detail-catalog-list">
                <li v-for="(item, index) in catalogList" :key="index" class="detail-catalog-list-item">
                {{item.orderNum + 1}} | {{item.catalogName}}
                <span class="detail-catalog-list-item-desc">{{item.catalogDescContent}}</span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ContentDetailItem from './ContentDetailItem.vue';
import { getCourseDetail } from '@/api';
import EdButton from '@/components/button/Index.vue';

@Options({
    components: { ContentDetailItem, EdButton },
    data () {
        return {
            item: {},
            catalogList: []
        };
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            const { courseId } = this.$route.query;
            getCourseDetail({ courseId }).then((res: any) => {
                if (res.code === 200) {
                    this.item = res.data.courseInfo;
                    this.item.catalogLength = res.data.catalogInfoList.length;
                    this.catalogList = res.data.catalogInfoList;
                }
            });
        },
    }
})
export default class ContentDetail extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.detail {
    &-item {
        width: 800px;
        margin: 0 auto;
    }
    &-catalog {
        padding: 0 120px;
        &-title {
            margin: 10px 0;
        }
        &-content {
            margin: 10px 0;
            text-indent: 20px;
            font: 400 16px/20px '';
            letter-spacing: 1px;
            padding-bottom: 30px;
            color: $formColor;
        }
        &-list {
            padding-bottom: 30px;
            &-item {
                font: 400 16px/50px '';
                height: 50px;
                color: $fontColor;
                cursor: pointer;
                text-indent: 20px;
                 &-desc {
                    font-size: 14px;
                    margin-left: 20px;
                    color: $tipsColor;
                }
            }
            &-item:hover {
                color: $orangeFontColor;
                background-color: $orangeBagColor;
            }
        }
    }
}
</style>
