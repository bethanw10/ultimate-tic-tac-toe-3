<template>
  <div class="tic-tac-toe">
    <div class="board-container">
      <WildTicTacToeGridVue @turn="gameTurn()" :board="board" :players-turn="Symbol.Cross" />
      <WinnerOverlayVue v-if="gameWon" :grid-size="3" :result="gameResult" @resetGame="resetGame"/>
    </div>
    <InfoBar :current-turn="currentTurn" @resetGame="resetGame" />
  </div>
</template>
  
<script lang="ts">
import { TicTacToeGrid } from '@/models/TicTacToeGrid';
import { Symbol } from '@/models/Symbol';
import InfoBar from '@/components/InfoBar.vue';
import WinnerOverlayVue from '../Overlay.vue';
import WildTicTacToeGridVue from './WildTicTacToeGrid.vue';
import { GameState } from '@/models/GameState';

export default {
  components: { InfoBar, WinnerOverlayVue, WildTicTacToeGridVue },
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
      return this.board.winner() !== GameState.InProgress
    },
    gameResult() {
      var winner = this.board.winner();
      
      if (winner == GameState.CrossWins || winner === GameState.NoughtWins) {
        return this.currentTurn == 1 ? GameState.Player1Wins : GameState.Player2Wins;
      }

      return winner;
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
      if (!this.gameWon) {
        this.currentTurn = this.currentTurn == 1 ? 2 : 1;
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

.board-container {
  display: flex;
  position: relative;
  font-family: 'Roboto', sans-serif;
  flex-wrap: wrap-reverse;
  margin: 1vmin;
  height: min(65vh, 100vw);
  width: min(65vh, 100vw);
  align-items: center;
  justify-content: center;
}
</style>
  