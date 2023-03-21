<template>
  <div class="board-container">
    <TicTacToeGridView :board="board" :players-turn="playersTurn" :disabled="disabled" @turn="$emit('turn')"/>
    <div class="overlay three-by-three-grid">
      <template v-for="(_, i) in board" :key="i">
        <div v-if="board.winner() == Symbol.Nought" class="overlay-square naughts"></div>
        <div v-if="board.winner() == Symbol.Cross" class="overlay-square crosses"></div>
        <div v-if="!gameWon && disabled" class="overlay-square disabled"></div>
      </template>
    </div>
    <div class="winner" v-if="gameWon">
      <CircleSymbol v-if="board.winner() == Symbol.Nought" class="winning-symbol" />
      <CrossSymbol v-if="board.winner() == Symbol.Cross" class="winning-symbol" />
    </div>
  </div>
</template>
  
<script lang="ts">
import { TicTacToeGrid } from '@/models/TicTacToeGrid';
import { Symbol } from '@/models/SymbolType';
import type { PropType } from 'vue';
import CircleSymbol from '@/components/Symbols/CircleSymbol.vue';
import CrossSymbol from '@/components/Symbols/CrossSymbol.vue';
import TicTacToeGridView from './TicTacToeGrid.vue';

export default {
  name: 'TicTacToeBoard',
  components: { CircleSymbol, CrossSymbol, TicTacToeGridView },
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
.board-container {
  display: flex;
  position: relative;
  font-family: 'Roboto', sans-serif;
  flex-wrap: wrap-reverse;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #ddd;
}

.three-by-three-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 2%;
}

.squares,
.square,
.symbol,
.overlay,
.overlay-square,
.winning-symbol {
  height: 100%;
  width: 100%;
}

.overlay {
  position: absolute;
  pointer-events: none;
}

.overlay-square {
  position: relative;
  border-radius: 10%;
}

.overlay-square.crosses {
  background-color: rgba(99, 39, 42, 0.8);
}

.overlay-square.naughts {
  background-color: rgba(70, 100, 109, 0.8);
}

.overlay-square.disabled {
  background-color: rgba(85, 85, 85, 0.8);
}

.winner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.winning-symbol {
  display: block;
  padding: 15%;
}
</style>
  