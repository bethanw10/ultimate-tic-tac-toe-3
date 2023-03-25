<template>
  <div class="squares three-by-three-grid">
    <template v-for="(symbol, i) in board" :key="i">
      <div class="square" :class="{ full: squareIsFull(symbol), disabled: disabled }" @click="pickSquare(i)">
        <CircleSymbol v-if="symbol == Symbol.Nought" class="symbol" animate />
        <CrossSymbol v-if="symbol == Symbol.Cross" class="symbol" animate />
      </div>
    </template>
  </div>
</template>
  
<script lang="ts">
import { TicTacToeGrid } from '@/models/TicTacToeGrid';
import { Symbol } from '@/models/Symbol';
import type { PropType } from 'vue';
import CircleSymbol from '@/components/Symbols/CircleSymbol.vue';
import CrossSymbol from '@/components/Symbols/CrossSymbol.vue';

export default {
  name: 'TicTacToeGrid',
  components: { CircleSymbol, CrossSymbol },
  props: {
    board: {
      type: TicTacToeGrid,
      required: true
    },
    playersTurn: {
      type: Number as PropType<Symbol>,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      Symbol,
    }
  },
  created() {
  },
  computed: {
    gameWon() {
      return this.board?.winner() !== Symbol.None;
    }
  },
  methods: {
    squareIsFull(symbol: Symbol) {
      return symbol !== Symbol.None;
    },
    pickSquare(i: number) {
      this.board.playMove(i, this.playersTurn)

      if (this.gameWon) {
        this.$emit('win', this.board.winner())
      }

      this.$emit('turn', i);
    }
  },
}
</script>
  
<style scoped>
.three-by-three-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 2%;
}

.squares,
.square,
.symbol {
  height: 100%;
  width: 100%;
}

.squares {
  position: relative;
}

.square {
  position: relative;
  border-radius: 1vh;
  padding: 15%;
  cursor: pointer;
  background: rgb(230 214 202);
}

.square.full {
  cursor: auto;
  pointer-events: none;
}

.square.disabled {
  cursor: auto;
  pointer-events: none;
}

.symbol {
  display: block;
}
</style>
  