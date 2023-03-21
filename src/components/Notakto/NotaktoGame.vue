<template>
  <div class="tic-tac-toe">
      <div class="board-container">
        <TicTacToeGridVue  @turn="gameTurn()" :board="board" :players-turn="Symbol.Cross" />
        <div v-if="gameWon" class="overlay three-by-three-grid">
          <template v-for="(_, i) in board" :key="i">
            <div v-if="currentTurn == 2" class="overlay-square red"></div>
            <div v-if="currentTurn == 1" class="overlay-square blue"></div>
          </template>
        </div>
        <div class="winner" v-if="gameWon">
          <OneSymbolVue v-if="currentTurn == 2" class="winning-symbol" />
          <TwoSymbolVue v-if="currentTurn == 1" class="winning-symbol" />
        </div>
      </div>
    <InfoBar :current-turn="currentTurn" @resetGame="resetGame" />
  </div>
</template>
  
<script lang="ts">
import { TicTacToeGrid } from '@/models/TicTacToeGrid';
import { Symbol } from '@/models/SymbolType';
import InfoBar from '@/components/InfoBar.vue';
import OneSymbolVue from '../Symbols/OneSymbol.vue';
import TwoSymbolVue from '../Symbols/TwoSymbol.vue';
import TicTacToeGridVue from '../TicTacToeGrid.vue';

export default {
  components: { InfoBar, OneSymbolVue, TwoSymbolVue, TicTacToeGridVue },
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

.three-by-three-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 2%;
}

.squares,
.square,
.symbol,
.overlay,
.overlay-square,
.winning-symbol {
  height: 100%;
  width: 100%;
}

.overlay {
  position: absolute;
  pointer-events: none;
}

.overlay-square {
  position: relative;
  border-radius: 10%;
}

.overlay-square.red {
  background-color: rgba(99, 39, 42, 0.8);
}

.overlay-square.blue {
  background-color: rgba(70, 100, 109, 0.8);
}

.overlay-square.disabled {
  background-color: rgba(85, 85, 85, 0.8);
}

.winner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.winning-symbol {
  display: block;
  padding: 15%;
}
</style>
  