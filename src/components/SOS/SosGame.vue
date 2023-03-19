<template>
  <div class="tic-tac-toe">
    <SosBoardView class="board" @turn="gameTurn($event)" :board="board" :players-turn="currentTurn" />
    <InfoBar @reset-game="resetGame" :current-turn="currentTurn" show-scores :player1-score="player1TotalSos"
      :player2-score="player2TotalSos" />
  </div>
</template>
    
<script lang="ts">
import { SosGrid } from '@/models/SosGrid';
import { Symbol } from '@/models/SymbolType';
import SosBoardView from '@/components/SOS/SosBoard.vue';
import InfoBar from '../InfoBar.vue';

export default {
  components: { SosBoardView, InfoBar },
  data() {
    return {
      board: new SosGrid(),
      currentTurn: 1,
      player1TotalSos: 0,
      player2TotalSos: 0,
      Symbol,
    }
  },
  computed: {
    gameWon() {
      return this.board.isBoardFull();
    }
  },
  methods: {
    isTurn(symbol: Symbol) {
      return this.currentTurn == symbol;
    },
    resetGame() {
      this.board.reset();
      this.currentTurn = 1;
      this.player1TotalSos = 0;
      this.player2TotalSos = 0;
    },
    squareIsFull(symbol: Symbol) {
      return symbol !== Symbol.None;
    },
    gameTurn(numSosMade: number) {
      if (numSosMade == 0) {
        if (this.currentTurn == 1) {
          this.currentTurn = 2;
        } else {
          this.currentTurn = 1;
        }
      } else {
        if (this.currentTurn == 1) {
          this.player1TotalSos += numSosMade;
        } else {
          this.player2TotalSos += numSosMade;
        }
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
  margin: 1vmin;
  height: min(65vh, 100vw);
  width: min(65vh, 100vw);
}
</style>
    