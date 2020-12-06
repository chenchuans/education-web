<template>
    <span :style="{width: `${width}px`, height: `${height}px`, lineHeight: `${height}px`}" :class="[type, 'button']" @click="handleClick"><slot/></span>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    name: 'Button',
    props: {
        width: {
            type: Number,
            default: 90
        },
        height: {
            type: Number,
            default: 30
        },
        type: {
            type: String,
            default: 'light'
        }, 
        params: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        handleClick() {
            this.$emit('click', this.params);
        }
    }
})
export default class Button extends Vue {}
</script>
<style lang="scss" scoped>
$fontColor: #fa8919;
.button {
    font-size: 14px;
    font-weight: 400;
    display: inline-block;
    text-align: center;
    border-radius: 5px;
}
.light {
    color: $fontColor;
    border: 1px solid $fontColor;
}
.dark {
    background-color: $fontColor;
    color: #fff;
}
</style>