<template>
    <div class="page home">
        <div class="home-search">
            <input @keyup.enter="handleEnter" v-model="searchValue" class="home-search-input" placeholder="回车搜索课程名称,讲师姓名" type="text"/>
            <span @click="handleSearch" class="home-search-button">🔍</span>
        </div>
        <ul class="home-list">
            <content-item v-for="(item, index) in list" :key="index" class="home-list-item" :item="item"/>
        </ul>
        <footer class="home-footer">
            <ed-button width="180px" height="50px" class="home-footer-button" v-if="isMoreData" @click="handleMore" type="dark">加载更多</ed-button>
        <p class="home-footer-tips" v-else>我也是有底线的</p>
        </footer>
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
                        this.isMoreData = false;
                    }
                }
            });
        },
        handleSearch() {
            this.page = 1;
            this.getList(true);
        },
        handleEnter(e) {
            this.page = 1;
            this.getList(true);
        },
        handleMore() {
            ++this.page;
            this.getList();
        }
    }
})
export default class Home extends Vue {};
</script>
<style lang="scss" scoped>
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
        &-input {
            border: 1px solid $inputBorderColor;
            border-radius: 16px;
            color: $formColor;
            background-color: transparent;
            outline: none;
            width: 360px;
            height: 36px;
            padding: 0 20px;
            line-height: 30px;
            font-size: 16px;
        }
        &-button {
            margin-left: 5px;
            font-size: 28px;
            cursor: pointer;
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
            font: 400 12px/3 '';
            color: $tipsColor;
        }
    }
}
</style>
