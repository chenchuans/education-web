<template>
    <div class="study">
        <h2 class="study-nav"></h2>
        <section class="study-content">
            <ul class="study-content-list"></ul>
            <div class="study-content-button">{{buttonText}}</div>
        </section>
        <aside-catalog class="study-aside"/>
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
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    &-nav {
        height: 50px;
        width: 100%;
        background-color: red;
    }
    &-content {
        width: calc(100vw - 300px);
        height: calc(100vh - 100px);
        display: inline-block;
        &-button {
            width: 100%;
            height: 50px;
            font: 500 20px/50px '';
            background-color: $orangeFontColor;
            color: #fff;
            text-align: center;
            border-radius: 6px;
        }
    }
}
</style>
