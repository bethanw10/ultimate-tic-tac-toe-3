<template>
  <div class="tic-tac-toe">
    <SosBoardView class="board" @turn="gameTurn($event)" :board="board" :players-turn="currentTurn" />
    <div class="controls">
      <div class="scores">
        <div class="score">
          <div class="turn" :class="currentTurn == 2 ? 'grey' : 'red'">
            <div>PLAYER</div>
            <img class="turn-symbol" :class="{ grey: currentTurn == 2 }" src="/src/assets/one.svg" />
          </div>
          <div class="total">{{ player1TotalSos }}</div>
        </div>

        <div class="vs">-</div>

        <div class="score">
          <div class="turn" :class="currentTurn == 1 ? 'grey' : 'blue'">
            <div>PLAYER</div>
            <img class="turn-symbol" :class="{ grey: currentTurn == 1 }" src="/src/assets/two.svg" />
          </div>
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
  position: relative;
  align-items: center;
}

.scores {
  display: flex;
  align-items: center;
  font-family: Nice Sugar;
}

.score {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 1.5em;
  background: #e6d6ca;
  border-radius: 1vh;
}

.turn {
  padding: 1.5vh 2vh;
  flex: 1;
  border-radius: 1vh 1vh 0 0;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  font-size: small;
  font-variant: small-caps;
  color: white;
  position: relative
}

.turn.red {
  background-color: #f75c6698;
}

.turn::before {
  content: '';
  position: absolute;
  top: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid transparent;
}

.turn.red::before {
  border-top: 10px solid var(--red);
}

.turn.blue::before {
  border-top: 10px solid var(--blue);
}

.turn.blue {
  background-color: #90c5d8cc;
}

.turn.grey {
  background-color: #aaa;
}

.turn-symbol {
  display: block;
  height: 100%;
  width: 5vh;
  aspect-ratio: 1/1;
  padding: .5vh;
}

.turn-symbol.grey {
  filter: contrast(0%);
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
  display: block;
  padding: 2vh;
  cursor: pointer;
  position: absolute;
  height: 10vh;
  background: var(--white);
  border-radius: 2vh;
  right: 0;
}
</style>
    