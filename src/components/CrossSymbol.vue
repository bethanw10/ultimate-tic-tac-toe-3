<template>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"  viewBox="-30 -30 210 210">
    <line class="line1"
        x1="0" y1="0" :x2="animate ? 0 : size" :y2="animate ? 0 : size" 
        stroke-linecap="round" style="stroke:#d14f58; stroke-width:50"
    >
        <animate v-if="animate" 
            id="line1Anim" attributeName="x2" attributeType="XML"
            :to="size" dur="0.1s"  fill="freeze"
        />
        <animate v-if="animate" 
            id="line1Anim" attributeName="y2" attributeType="XML"
            :to="size" dur="0.1s" fill="freeze"
        />
    </line>
    <line class="line2" 
        :x1="size" y1="0" :x2="animate ? size : 0" :y2="animate ? 0 : size" 
        :stroke-width="animate ? 0 : 50" style="stroke:#d14f58" stroke-linecap="round" 
    >
        <animate v-if="animate" id="line2Anim" attributeName="stroke-width" attributeType="XML"
            :to="strokeWidth"
            begin="0.1s"
            :values="`${strokeWidth}; ${strokeWidth}`"
            keyTimes="0; 1" 
            dur="0.1s" fill="freeze"
        />
        <animate v-if="animate" id="line2Anim" attributeName="x2" attributeType="XML"
            to="0" begin="0.1s" dur="0.1s"  fill="freeze"
        />
        <animate v-if="animate" id="line2Anim" attributeName="y2" attributeType="XML"
            :to="size" begin="0.1s" dur="0.1s" fill="freeze"
        />
    </line>
</svg>
</template>
<script lang="ts">
    export default {
        name: 'CrossSymbol',
        data() {
            return {
                size: 150,
                strokeWidth: 50
            }
        },
        props: {
            animate: {
                type: Boolean,
                default: false
            }
        },
    }
</script>
<style scoped>
/* .line2 {
    animation-delay:.5s
  } */
</style>