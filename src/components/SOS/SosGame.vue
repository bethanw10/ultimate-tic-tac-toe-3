<template>
  <div class="tic-tac-toe">
    <SosBoardView class="board" @turn="gameTurn($event)" :board="board" :players-turn="currentTurn" />
    <div class="controls">
      <div class="scores">
        <div class="score">
          <img class="turn-symbol" :class="{ grey: currentTurn == 2 }" src="/src/assets/one.svg" />
          <div class="total">{{ player1TotalSos }}</div>
          <div v-show="currentTurn == 1" class="turn-indicator" style="background: var(--red);"></div>
        </div>

        <div class="vs">-</div>

        <div class="score">
          <img class="turn-symbol" :class="{ grey: currentTurn == 1 }" src="/src/assets/two.svg" />
          <div class="total">{{ player2TotalSos }}</div>
          <div v-show="currentTurn == 2" class="turn-indicator" style="background: var(--blue);"></div>
        </div>
      </div>
      <img class="reset" @click="resetGame" src="/src/assets/reset.svg" />
    </div>
  </div>
</template>
    
<script lang="ts">
import { SosGrid } from '@/models/SosGrid';
import { Symbol } from '@/models/SymbolType';
import SosBoardView from '@/components/SOS/SosBoard.vue';

export default {
  components: { SosBoardView },
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
      if (this.currentTurn == 1) {
        this.player1TotalSos += numSosMade;
        this.currentTurn = 2;
      } else {
        this.player2TotalSos += numSosMade;
        this.currentTurn = 1;
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
  /* margin: 16px; */
  height: calc(min(80vh, 100vw) - 32px);
  width: calc(min(80vh, 100vw) - 32px);
}

.controls {
  height: calc(20vh - 16px);
  width: calc(min(80vh, 100vw) - 32px);
  padding: 1vh;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  /* background: #e6d6ca; */
}

.scores {
  display: flex;
  align-items: center;
  margin-left: auto;
  font-family: Nice Sugar;
}

.score {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 1.3em;
  background: #e6d6ca;
  border-radius: 1vh;
}

.turn-symbol {
  flex: 2;
  margin: 2vh 2vh 0 2vh;
  display: block;
  width: 3em;
  aspect-ratio: 1/1;
}

.turn-symbol.grey {
  filter: contrast(0%);
}

.turn-indicator {
  height: 6%;
  width: 100%;
  display: block;
  border-radius: 0 0 1vh 1vh;
}

.total {
  padding: 1vh 0;
}

.vs {
  color: #aaa;
  font-size: 2em;
  margin: 1vh;
}

.reset {
  margin-left: auto;
  height: 100%;
  display: block;
  padding: 2vh;
  cursor: pointer;
}
</style>
    