<template>
    <div class="home">
            <ul class="home-list">
                <content-item class="home-list-item"/>
            </ul>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ContentItem from './ContentItem.vue';

@Options({
    components: { ContentItem }
})
export default class Home extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.home {
    &-list {
        &-item {

        }
    }
}
</style>
