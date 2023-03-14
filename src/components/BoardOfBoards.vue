<template>
    <div class="board-container">
      <div class="squares nine-by-nine-grid">
        <template v-for="(_, i) in board" :key="i">
            <BoardVue 
                @win="childGameWon(i, $event)"  
                @turn="childGameTurn()"
                :players-turn="currentTurn"/>
        </template>
      </div>
      <!-- <div class="overlay tic-tac-toe-grid" v-if="gameWon">
        <div class="overlay-subgrid tic-tac-toe-grid" v-for="(_, i) in board" :key="i">
            <template v-for="(_, j) in board" :key="j">
                <div v-if="board.winner() == SymbolType.Nought" class="overlay-square naughts"></div>
                <div v-if="board.winner() == SymbolType.Cross" class="overlay-square crosses"></div>
            </template>
        </div>
      </div> -->
      <div class="winner" v-if="gameWon">
        <img v-if="board.winner() == SymbolType.Nought" class="winning-symbol" src="/src/assets/circle.svg"/>
        <img v-if="board.winner() == SymbolType.Cross" class="winning-symbol" src="/src/assets/cross.svg"/>
      </div>
    </div>
  </template>
  
<script lang="ts">
  import { Board } from '@/models/Board';
  import { Symbol } from '@/models/SymbolType';
  import BoardVue from './Board.vue';

  export default {
    components: { BoardVue },
    data() {
      return {
        board: new Board(),
        currentTurn: Symbol.Cross,
        SymbolType: Symbol,
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
      squareIsFull(symbol: Symbol) {
        return symbol !== Symbol.None;
      },
      childGameTurn() {
        if (this.currentTurn == Symbol.Cross) {
            this.currentTurn = Symbol.Nought
        } else {
            this.currentTurn = Symbol.Cross
        }
      },
      childGameWon(i: number, Symbol: Symbol) {
        this.board.placeSymbol(i, Symbol);
      }
    },
  }
</script>
  
  <style scoped>
  .board-container {
    display: flex;
    font-family: 'Roboto', sans-serif;
    flex-wrap: wrap-reverse;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .squares, .overlay, .winner {
    margin: 32px 16px;
    height: calc(min(100vh, 100vw) - 64px);
    width: calc(min(100vh, 100vw) - 64px);
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
  