<template>
    <svg fill="#5496ad" viewBox="-1 -1 20 30" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-width="5" stroke-linejoin="round" :stroke="color"
            d="M14.5 13.531l-8.344 9.813h10.156v2.25h-15.031l7.969-9.344s3.656-4.219 4-4.75 0.594-1.469 0.594-2.344c0-2.719-2.188-4.938-4.938-4.938-2.719 0-4.938 2.219-4.938 4.938 0 0.813 0.188 1.531 0.531 2.219h-2.313c-0.25-0.719-0.406-1.406-0.406-2.219 0-3.906 3.219-7.125 7.125-7.125 3.656 0 6.656 2.75 7.063 6.313 0.031 0.25 0.031 0.563 0.031 0.813 0 1.656-0.563 3.188-1.5 4.375z">
        </path>
    </svg>
</template>
<script lang="ts">
export default {
    name: 'TwoSymbol',
    props: {
        color: {
            type: String,
            default: "var(--blue)"
        }
    },
}
</script>