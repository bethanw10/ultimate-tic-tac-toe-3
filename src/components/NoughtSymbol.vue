<template>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"  viewBox="-15 -15 150 150">
        <circle
            stroke="#82b1c2"
            stroke-width="35"
            stroke-linecap="round"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
            stroke-dasharray="1000"
            :stroke-dashoffset="animate ? 1000 : 0"
        >
            <animate v-if="animate" 
            attributeName="stroke-dashoffset"
            calcMode="linear"
            to="0" dur="0.4s" fill="freeze"
            />
        </circle>
    </svg>
</template>
<script lang="ts">
    export default {
        name: 'NoughtSymbol',
        props: {
            animate: {
                type: Boolean,
                default: false
            }
        },
    }
</script>