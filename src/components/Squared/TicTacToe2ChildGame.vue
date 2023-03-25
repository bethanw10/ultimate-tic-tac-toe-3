<template>
  <div class="board-container">
    <TicTacToeGridVue :board="board" :players-turn="playersTurn" :disabled="disabled" @turn="pickSquare($event)" />
    <WinnerOverlayVue v-if="gameWon || disabled" 
      :player1-win="board.winner() === Symbol.Cross" 
      :grid-size="3"
      :disabled="!gameWon && disabled" 
      player1-symbol="CrossSymbol" player2-symbol="CircleSymbol" />
  </div>
</template>
  
<script lang="ts">
import { TicTacToeGrid } from '@/models/TicTacToeGrid';
import { Symbol } from '@/models/Symbol';
import type { PropType } from 'vue';
import TicTacToeGridVue from '../TicTacToeGrid.vue';
import WinnerOverlayVue from '../WinnerOverlay.vue';

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
  height: 100%;
  display: flex;
  position: relative;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: center;
}
</style>
  