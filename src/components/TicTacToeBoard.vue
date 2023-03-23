<template>
  <div class="board-container">
    <TicTacToeGridVue :board="board" :players-turn="playersTurn" :disabled="disabled" @turn="pickSquare($event)" />
    <WinnerOverlayVue v-if="gameWon || disabled" 
      :player1-win="board.winner() === Symbol.Cross" 
      :grid-size="board.length"
      :disabled="!gameWon && disabled" 
      player1-symbol="CrossSymbol" player2-symbol="CircleSymbol" />
  </div>
</template>
  
<script lang="ts">
import { TicTacToeGrid } from '@/models/TicTacToeGrid';
import { Symbol } from '@/models/SymbolType';
import type { PropType } from 'vue';
import TicTacToeGridVue from './TicTacToeGrid.vue';
import WinnerOverlayVue from './WinnerOverlay.vue';

export default {
  name: 'TicTacToeBoard',
  components: { TicTacToeGridVue, WinnerOverlayVue },
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
  