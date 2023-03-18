<template>
  <div class="controls">
    <CircleSymbol class="turn-symbol" :class="{ grey: playersTurn == Symbol.Cross }" />
    <img class="reset" @click="resetGame" src="/src/assets/reset.svg" />
    <CrossSymbol class="turn-symbol" :class="{ grey: playersTurn == Symbol.Nought }" />
  </div>
</template>
  
<script lang="ts">
import { Symbol } from '@/models/SymbolType';
import type { PropType } from 'vue';
import CircleSymbol from '@/components/Symbols/CircleSymbol.vue';
import CrossSymbol from '@/components/Symbols/CrossSymbol.vue';

export default {
  name: 'ControlsComp',
  components: { CircleSymbol, CrossSymbol },
  props: {
    playersTurn: {
      type: Number as PropType<Symbol>,
      required: true
    },
  },
  data() {
    return {
      Symbol,
    }
  },
  methods: {
    resetGame() {
      this.$emit("reset-game")
    }
  },
}
</script>
  
<style scoped>
.controls {
  background: rgb(230 214 202);
  height: calc(10vh - 16px);
  width: calc(min(90vh, 100vw) - 32px);
  border-radius: 10px;
  display: flex;
}


.turn-symbol {
  width: 100%;
  height: 100%;
  display: block;
  padding: 1vh;
}

.turn-symbol.grey {
  filter: contrast(0%);
}

.reset {
  width: 100%;
  height: 100%;
  display: block;
  padding: 1vh;
  cursor: pointer;
}
</style>
  