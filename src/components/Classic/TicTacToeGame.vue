<template>
  <div class="tic-tac-toe">
    <BoardVue class="board" @turn="gameTurn()" :board="board" :players-turn="currentTurn" />
    <InfoBar :current-turn="currentTurn" @resetGame="resetGame">
      <template v-slot:player1>
        <CrossSymbol />
      </template>
      <template v-slot:player2>
        <CircleSymbol />
      </template>
    </InfoBar>
  </div>
</template>
  
<script lang="ts">
import { TicTacToeGrid } from '@/models/TicTacToeGrid';
import { Symbol } from '@/models/SymbolType';
import BoardVue from '@/components/TicTacToeBoard.vue';
import InfoBar from '@/components/InfoBar.vue';
import CircleSymbol from '@/components/Symbols/CircleSymbol.vue';
import CrossSymbol from '@/components/Symbols/CrossSymbol.vue';

export default {
  components: { BoardVue, InfoBar, CircleSymbol, CrossSymbol },
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
      this.currentTurn = this.currentTurn == Symbol.Cross
        ? Symbol.Nought
        : Symbol.Cross;
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
  