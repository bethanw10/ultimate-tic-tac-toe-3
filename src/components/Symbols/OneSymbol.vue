<template>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="190 -30 20 260">
        <line class="line1" x1="200" y1="200" x2="200" y2="0" stroke-linecap="round" :stroke="color" stroke-width="60" />

        <line class="line2" x1="200" y1="0" x2="150" y2="50" stroke-width="60" :stroke="color" stroke-linecap="round" />
    </svg>
</template>
<script lang="ts">
export default {
    name: 'OneSymbol',
    props: {
        color: {
            type: String,
            default: "var(--red)"
        }
    },
}
</script>