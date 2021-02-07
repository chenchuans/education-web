<template>
    <div class="page home">
        <div class="home-search">
            <div class="home-search-all">
                <input @keyup.enter="handleEnter" v-model="searchValue" class="home-search-all-input" placeholder="回车搜索课程名称,讲师姓名" type="text"/>
                <span @click="handleSearch" class="home-search-all-button"></span>
            </div>
        </div>
        <ul class="home-list">
            <content-item v-for="(item, index) in list" :key="index" class="home-list-item" :item="item"/>
        </ul>
        <footer class="home-footer">
            <ed-button width="180px" height="50px" class="home-footer-button" v-if="isMoreData" @click="handleMore" type="dark">加载更多</ed-button>
        <p class="home-footer-tips" v-else>我也是有底线的</p>
        </footer>
        <div class="home-website">
            <p class="home-website-info">数趣网络 豫ICP备2020037022号</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ContentItem from './ContentItem.vue';
import { getHomeList } from '@/api';
import EdButton from '@/components/button/Index.vue';

@Options({
    components: { ContentItem, EdButton },
    data () {
        return {
            searchValue: '',
            list: [],
            page: 1,
            isMoreData: true
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList(isSearch = false) {
            getHomeList({
                page: this.page,
                size: 10,
                isSearch,
                content: this.searchValue
            }).then((res: any) => {
                if (res.code === 200) {
                    if (res.data.courseInfos.length > 0) {
                        this.list = res.data.courseInfos.concat(this.list);
                    } else {
                        this.$toast('暂无更多课程');
                        this.isMoreData = false;
                    }
                }
            });
        },
        handleSearch() {
            this.page = 1;
            this.getList(true);
            this.list = [];
        },
        handleEnter(e) {
            this.page = 1;
            this.getList(true);
            this.list = [];
        },
        handleMore() {
            ++this.page;
            this.getList();
        }
    }
})
export default class Home extends Vue {};
</script>
<style lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.home {
    width: 100%;
    &-search {
        margin: 0 auto;
        height: 40px;
        width: 400px;
        padding: 20px 0 40px 0;
        display: flex;
        &-all {
            width: 360px;
            height: 36px;
            position: relative;
            &-input {
                border: 1px solid $inputBorderColor;
                border-radius: 16px;
                color: $formColor;
                width: 360px;
                height: 36px;
                padding: 0 20px;
                background-color: transparent;
                outline: none;
                line-height: 30px;
                font-size: 16px;
            }
            &-button {
                background: url('./../../assets/img/search.png') 100% 100%;
                position: absolute;
                right: 5px;
                width: 36px;
                height: 36px;
                top: -2px;
                cursor: pointer;
            }
        }
    }
    &-list {
        width: 800px;
        margin: 0 auto;
    }
    &-footer {
        text-align: center;
        margin: 30px 0;
        &-button {
            font-size: 20px;
        }
        &-tips {
            font-size: 12px;
            line-height: 36px;
            color: $tipsColor;
        }
    }
    &-website {
        background: #fafafa;
        position: fixed;
        bottom: 0;
        min-height: 30px;
        width: 100%;
        &-info {
            text-align: center;
            font-size: 12px;
            line-height: 30px;
            color: #888;
        }
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
        font-size: 16px;
    }
}
</style>
