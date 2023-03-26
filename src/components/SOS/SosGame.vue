<template>
  <div class="tic-tac-toe">
    <div class="board-container">
      <SosBoardVue class="board" @turn="gameTurn($event)" :board="board" :players-turn="currentTurn" />
      <WinnerOverlayVue v-if="gameOver" @resetGame="resetGame" :grid-size="board.size" :player1-win="player1TotalSos > player2TotalSos" />
    </div>
    <InfoBar @reset-game="resetGame" :current-turn="currentTurn" show-scores :player1-score="player1TotalSos"
      :player2-score="player2TotalSos" />
  </div>
</template>
    
<script lang="ts">
import { SosGrid } from '@/models/SosGrid';
import { Symbol } from '@/models/Symbol';
import SosBoardVue from '@/components/SOS/SosBoard.vue';
import InfoBar from '@/components/InfoBar.vue';
import WinnerOverlayVue from '@/components/Overlay.vue';

export default {
  components: { SosBoardVue, InfoBar, WinnerOverlayVue },
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
    gameOver() {
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
        this.currentTurn = this.currentTurn == 1 ? 2 : 1;
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

.board-container {
  position: relative;
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: center;

  margin: 1vmin;
  height: min(65vh, 100vw);
  width: min(65vh, 100vw);
}
</style>
    