<template>
    <aside class="catalog">
       
    </aside>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";


@Options({
    components: { },
    data () {
        return {
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
export default class Catalog extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.catalog {
    width: 300px;
    height: 500px;
    background-color: gray;
    display: inline-block;
}
</style>
