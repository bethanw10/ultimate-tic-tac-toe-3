<template>
  <div class="board-container">
    <TicTacToeGridVue :board="board" :players-turn="playersTurn" :disabled="disabled" @turn="pickSquare($event)" />
    <ChildOverlayVue v-if="gameWon || disabled" 
      :crossWin="board.winner() === GameState.CrossWins"
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
import ChildOverlayVue from './ChildOverlay.vue';
import { GameState } from '@/models/GameState';

export default {
  name: 'TicTacToeBoard',
  components: { TicTacToeGridVue, ChildOverlayVue },
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
      Symbol, GameState
    }
  },
  computed: {
    gameWon() {
      return this.board?.winner() !== GameState.InProgress;
    }
  },
  methods: {
    squareIsFull(symbol: Symbol) {
      return symbol !== Symbol.None;
    },
    pickSquare(i: number) {
      this.board.playMove(i, this.playersTurn)

      if (this.gameWon) {
        var winner = this.board.winner() == GameState.CrossWins ? Symbol.Cross : Symbol.Nought;
        this.$emit('win', winner)
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
  