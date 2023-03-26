<template>
  <div class="tic-tac-toe-squared">
    <div class="parent-board-container">
      <div class="squares three-by-three-grid">
        <template v-for="(childBoard, i) in childBoards" :key="i">
          <ChildBoardVue @win="childGameWon(i, $event)" @turn="childGameTurn($event)" :board="childBoard"
            :players-turn="currentTurn" :disabled="currentBoard !== null && i !== currentBoard" />
        </template>
      </div>

      <WinnerOverlayVue v-if="gameWon" :result="board.winner()" :grid-size="3" @resetGame="resetGame"
        player1-symbol="CrossSymbol" player2-symbol="CircleSymbol" />
    </div>

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
import { Symbol } from '@/models/Symbol'
import ChildBoardVue from '@/components/Squared/TicTacToe2ChildGame.vue';
import CircleSymbol from '@/components/Symbols/CircleSymbol.vue';
import CrossSymbol from '@/components/Symbols/CrossSymbol.vue';
import InfoBar from '@/components/InfoBar.vue';
import WinnerOverlayVue from '../Overlay.vue';
import { GameState } from '@/models/GameState';

export default {
  components: { ChildBoardVue, CircleSymbol, CrossSymbol, InfoBar, WinnerOverlayVue },
  data() {
    return {
      board: new TicTacToeGrid(),
      childBoards: [] as TicTacToeGrid[],
      currentTurn: Symbol.Cross,
      currentBoard: null as Number | null,
      Symbol,
    }
  },
  created() {
    for (let i = 0; i < 9; i++) {
      this.childBoards.push(new TicTacToeGrid());
    }
  },
  computed: {
    gameWon() {
      return this.board.winner() !== GameState.InProgress;
    }
  },
  methods: {
    isTurn(symbol: Symbol) {
      return this.currentTurn == symbol;
    },
    resetGame() {
      this.board.reset();

      for (const childBoard of this.childBoards) {
        childBoard.reset();
      }

      this.currentBoard = null;
      this.currentTurn = Symbol.Cross;
    },
    squareIsFull(symbol: Symbol) {
      return symbol !== Symbol.None;
    },
    childGameTurn(i: number) {
      if (this.currentTurn == Symbol.Cross) {
        this.currentTurn = Symbol.Nought
      } else {
        this.currentTurn = Symbol.Cross
      }

      if (this.board[i] == Symbol.None) {
        this.currentBoard = i;
      } else {
        this.currentBoard = null;
      }
    },
    childGameWon(i: number, symbol: Symbol) {
      this.board.playMove(i, symbol);
    }
  },
}
</script>
  
<style scoped>
.tic-tac-toe-squared {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

.parent-board-container {
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

.board-container {
  position: relative;
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: center;

}

.three-by-three-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 2%;
}

.squares {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
  