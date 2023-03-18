<template>
<svg  viewBox="0 0 230 230">
  <g transform="translate(60,10)">
    <g stroke-width="50" fill="none" stroke-linecap="round">
      <path d="M100 50 A50 40 0 1 0 50 100" :stroke="color" stroke-dasharray="600" :stroke-dashoffset="animate ? 600 : 0">
        <animate v-if="animate" id="line1" attributeName="stroke-dashoffset" calcMode="linear" to="0" dur="0.3s" fill="freeze" />
      </path>
      <path d="M50 100 A50 45 0 1 1 0 150" :stroke="color" stroke-dasharray="600" :stroke-dashoffset="animate ? 600 : 0">
        <animate v-if="animate" attributeName="stroke-dashoffset" calcMode="linear" to="0" begin="0.1s" dur="0.3s" fill="freeze" />
      </path>
    </g>
  </g>
</svg>
</template>
<script lang="ts">
export default {
    name: 'SSymbol',
    props: {
        animate: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: "#666666"
        }
    },
}
</script>