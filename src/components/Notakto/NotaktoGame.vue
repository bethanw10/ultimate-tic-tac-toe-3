<template>
  <div class="tic-tac-toe">
    <BoardVue class="board" @turn="gameTurn()" :board="board" :players-turn="Symbol.Cross" />
    <InfoBar :current-turn="currentTurn" @resetGame="resetGame" />
  </div>
</template>
  
<script lang="ts">
import { TicTacToeGrid } from '@/models/TicTacToeGrid';
import { Symbol } from '@/models/SymbolType';
import BoardVue from '@/components/TicTacToeBoard.vue';
import InfoBar from '@/components/InfoBar.vue';

export default {
  components: { BoardVue, InfoBar },
  data() {
    return {
      board: new TicTacToeGrid(),
      currentTurn: 1,
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
      this.currentTurn = 1;
      this.board.reset();
    },
    squareIsFull(symbol: Symbol) {
      return symbol !== Symbol.None;
    },
    gameTurn() {
      this.currentTurn = this.currentTurn == 1 ? 2 : 1;
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
  margin: 1vmin;
  height: min(65vh, 100vw);
  width: min(65vh, 100vw);
}
</style>
  