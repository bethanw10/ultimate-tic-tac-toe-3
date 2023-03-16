<template>
  <div class="tic-tac-toe-squared">
    <div class="board-container">
      <div class="squares nine-by-nine-grid">
        <template v-for="(childBoard, i) in childBoards" :key="i">
          <BoardVue @win="childGameWon(i, $event)" @turn="childGameTurn($event)" :board="childBoard"
            :players-turn="currentTurn" :disabled="currentBoard !== null && i !== currentBoard" />
        </template>
      </div>

      <div class="overlay nine-by-nine-grid" v-if="gameWon">
        <template v-for="(_, i) in board" :key="i">
          <div v-if="board.winner() == Symbol.Nought" class="overlay-square naughts"></div>
          <div v-if="board.winner() == Symbol.Cross" class="overlay-square crosses"></div>
        </template>
      </div>

      <div class="winner" v-if="gameWon">
        <NoughtSymbol v-if="board.winner() == Symbol.Nought" class="winning-symbol" />
        <CrossSymbol v-if="board.winner() == Symbol.Cross" class="winning-symbol" />
      </div>
    </div>

    <Controls :players-turn="currentTurn" @resetGame="resetGame" />
  </div>
</template>
  
<script lang="ts">
import { Board } from '@/models/Board';
import { Symbol } from '@/models/SymbolType';
import BoardVue from '@/components/Board.vue';
import NoughtSymbol from '@/components/NoughtSymbol.vue';
import CrossSymbol from '@/components/CrossSymbol.vue';
import Controls from '../Controls.vue';

export default {
  components: { BoardVue, NoughtSymbol, CrossSymbol, Controls },
  data() {
    return {
      board: new Board(),
      childBoards: [] as Board[],
      currentTurn: Symbol.Cross,
      currentBoard: null as Number | null,
      Symbol,
    }
  },
  created() {
    for (let i = 0; i < 9; i++) {
      this.childBoards.push(new Board());
    }
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
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: space-around;
}

.board-container {
  display: flex;
  font-family: 'Roboto', sans-serif;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: center;
}

.squares,
.overlay,
.winner {
  margin: 16px 16px 16px 16px;
  height: calc(min(80vh, 100vw) - 32px);
  width: calc(min(80vh, 100vw) - 32px);
}

.nine-by-nine-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 2%;
}

.squares {
  position: relative;
}

.winner {
  position: absolute;
}

.winning-symbol {
  width: 100%;
  height: 100%;
  display: block;
  padding: 15%;
  user-select: none;
}

.overlay {
  position: absolute;
}

.overlay-square {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 2%;
}

.overlay-square.crosses {
  background-color: #5a2528a9;
}

.overlay-square.naughts {
  background-color: #34474ea1;
}
</style>
  