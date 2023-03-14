<template>
    <div class="board-container">
      <div class="squares nine-by-nine-grid">
        <template v-for="(symbol, i) in board" :key="i">
            <div 
                class="square" 
                :class="{full: squareIsFull(symbol), disabled: gameWon || !isCurrentPlayersTurn}"
                @click="pickSquare(i)">
              <img v-if="symbol == Symbol.Nought" class="symbol" src="/src/assets/circle.svg"/>
              <img v-if="symbol == Symbol.Cross" class="symbol" src="/src/assets/cross.svg"/>
            </div>
        </template>
      </div>
      <div class="overlay nine-by-nine-grid">
        <template v-for="(_, i) in board" :key="i">
          <div v-if="board.winner() == Symbol.Nought" class="overlay-square naughts"></div>
          <div v-if="board.winner() == Symbol.Cross" class="overlay-square crosses"></div>
          <div v-if="!gameWon && !isCurrentPlayersTurn" class="overlay-square disabled"></div>
        </template>
      </div>
      <div class="winner" v-if="gameWon">
        <img v-if="board.winner() == Symbol.Nought" class="winning-symbol" src="/src/assets/circle.svg"/>
        <img v-if="board.winner() == Symbol.Cross" class="winning-symbol" src="/src/assets/cross.svg"/>
      </div>
    </div>
  </template>
  
<script lang="ts">
  import { Board } from '@/models/Board';
  import { Symbol } from '@/models/SymbolType';
  import type { PropType } from 'vue';

  export default {
    name: 'BoardView',
    components: {},
    props: {
      playersTurn: {
        type: Number as PropType<Symbol>,
        required: true
      } 
    },
    data() {
      return {
        board: new Board(),
        Symbol,
      }
    },
    created() {
    },
    computed: {
      gameWon() {
        return this.board.winner() !== Symbol.None;
      },
      isCurrentPlayersTurn() {
        return this.board.turn == Symbol.None || this.playersTurn === this.board.turn;
      }
    },
    methods: {
      squareIsFull(symbol: Symbol) {
        return symbol !== Symbol.None;
      },
      pickSquare(i: number) {
        this.board.playMove(i, this.playersTurn)

        this.$emit('turn');

        if (this.gameWon) {
          this.$emit('win', this.board.winner())
        }
      }
    },
  }
</script>
  
  <style scoped>
  .board-container {
    display: flex;
    position: relative;
    font-family: 'Roboto', sans-serif;
    flex-wrap: wrap-reverse;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: #ddd;
  }

  .nine-by-nine-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);    
    grid-gap: 2%;
  }

  .squares, .square, .symbol, .overlay, .overlay-square, .winning-symbol {
    height: 100%;
    width: 100%;
  }

  .squares {
    position: relative;
  }

  .square {
    position: relative;
    border-radius: 10%;
    padding: 15%;
    cursor: pointer;    
    background: rgb(230 214 202);
  }

  .square.full {
    cursor: auto;
    pointer-events: none;
  }

  .square.disabled {
    cursor: auto;
    pointer-events: none;
  }

  .symbol {
    display: block;
    user-select: none;
  }

  .overlay { 
    position: absolute;
    pointer-events: none;
  }

  .overlay-square {
    position: relative;    
    border-radius: 10%;
  }

  .overlay-square.crosses {    
    background-color: rgba(99, 39, 42, 0.8);
  }

  .overlay-square.naughts {
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
  