<template>
  <div class="squares three-by-three-grid">
    <template v-for="(symbol, i) in board" :key="i">
      <div class="square" :class="{ full: squareIsFull(symbol)}">
        <div class="choice" v-if="symbol == Symbol.None">
          <div class="s" @click="pickSquare(i, Symbol.Cross)">
            <CrossSymbol class="symbol" color="#a39993" />
          </div>

          <div class="divider"></div>

          <div class="o" @click="pickSquare(i, Symbol.Nought)">
            <CircleSymbol class="symbol" color="#a39993" />
          </div>
        </div>
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
    pickSquare(i: number, symbol: Symbol) {
      this.board.playMove(i, symbol)

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
.square {
  height: 100%;
  width: 100%;
}

.squares {
  position: relative;
}

.square {
  position: relative;
  border-radius: 1vh;
  cursor: pointer;
  background: var(--white);
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
  margin: 15%;
}

.choice {
  height: 100%;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  display: none;
}

.square:active .choice {
  display: flex;
}

.square:hover .choice {
  display: flex;
}

.o:hover .symbol,
.s:hover .symbol {
  margin: 10%;
}

@media (hover: none) {
  .square .choice {
    display: flex;
  }
}

.s,
.o {
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
}

.divider {
  content: '';
  width: 5%;
  height: 80%;
  background: #0000001f;
  border-radius: 2em;
  pointer-events: none;
}
</style>
  