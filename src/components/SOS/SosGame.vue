<template>
  <div class="tic-tac-toe">
    <SosBoardView class="board" @turn="gameTurn($event)" :board="board" :players-turn="currentTurn" />
    <div class="controls">
      <div class="scores">
        <div class="score">
          <img class="turn-symbol" :class="{ grey: currentTurn == 2 }" src="/src/assets/one.svg" />
          <div class="total">{{ player1TotalSos }}</div>
        </div>

        <div class="vs">-</div>

        <div class="score">
          <img class="turn-symbol" :class="{ grey: currentTurn == 1 }" src="/src/assets/two.svg" />
          <div class="total">{{ player2TotalSos }}</div>
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
  margin: 16px 16px 16px 16px;
  height: calc(min(80vh, 100vw) - 32px);
  width: calc(min(80vh, 100vw) - 32px);
}

.controls {
  background: #e6d6ca;
  height: calc(15vh - 16px);
  width: calc(min(90vh, 100vw) - 32px);
  padding: 1vh;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}

.scores {
  display: flex;
  align-items: center;
  margin-left: auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
}

.score {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0% 30%;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 1.3em;
  /* background: #f5e8df; */
  border-radius: 1vh;
}

.total {
  
}

.turn-symbol {
  flex: 1;
  padding: 1vh;
  display: block;
}

.turn-symbol.grey {
  filter: contrast(0%);
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
    