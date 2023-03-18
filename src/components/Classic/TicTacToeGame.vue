<template>
  <div class="tic-tac-toe">
    <BoardVue class="board" @turn="gameTurn()" :board="board" :players-turn="currentTurn" />
    <Controls :players-turn="currentTurn" @resetGame="resetGame" />
  </div>
</template>
  
<script lang="ts">
import { TicTacToeGrid } from '@/models/TicTacToeGrid';
import { Symbol } from '@/models/SymbolType';
import BoardVue from '@/components/TicTacToeBoard.vue';
import Controls from '../Controls.vue';

export default {
  components: { BoardVue, Controls },
  data() {
    return {
      board: new TicTacToeGrid(),
      currentTurn: Symbol.Cross,
      Symbol,
    }
  },
  created() {
  },
  computed: {
    gameWon() {
      return this.board.winner() !== Symbol.None
    }
  },
  methods: {
    isTurn(symbol: Symbol) {
      return this.currentTurn == symbol;
    },
    resetGame() {
      this.board.reset();
      this.currentTurn = Symbol.Cross;
    },
    squareIsFull(symbol: Symbol) {
      return symbol !== Symbol.None;
    },
    gameTurn() {
      if (this.currentTurn == Symbol.Cross) {
        this.currentTurn = Symbol.Nought
      } else {
        this.currentTurn = Symbol.Cross
      }
    },
  },
}
</script>
  
<style scoped>
.tic-tac-toe {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

.board {
  margin: 16px 16px 16px 16px;
  height: calc(min(80vh, 100vw) - 32px);
  width: calc(min(80vh, 100vw) - 32px);
}
</style>
  