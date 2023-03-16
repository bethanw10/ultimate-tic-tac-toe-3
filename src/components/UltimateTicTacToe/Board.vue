<template>
    <div class="board-container">
      <div class="squares nine-by-nine-grid">
        <template v-for="(symbol, i) in board" :key="i">
            <div 
              class="square" 
              :class="{full: squareIsFull(symbol), disabled: disabled}"
              @click="pickSquare(i)"
            >
              <NoughtSymbol v-if="symbol == Symbol.Nought" class="symbol nought" animate/>
              <CrossSymbol v-if="symbol == Symbol.Cross" class="symbol cross" animate/>
            </div>
        </template>
      </div>
      <div class="overlay nine-by-nine-grid">
        <template v-for="(_, i) in board" :key="i">
          <div v-if="board.winner() == Symbol.Nought" class="overlay-square naughts"></div>
          <div v-if="board.winner() == Symbol.Cross" class="overlay-square crosses"></div>
          <div v-if="!gameWon && disabled" class="overlay-square disabled"></div>
        </template>
      </div>
      <div class="winner" v-if="gameWon">
        <NoughtSymbol v-if="board.winner() == Symbol.Nought" class="winning-symbol"/>
        <CrossSymbol v-if="board.winner() == Symbol.Cross" class="winning-symbol"/>
      </div>
    </div>
  </template>
  
<script lang="ts">
  import { Board } from '@/models/Board';
  import { Symbol } from '@/models/SymbolType';
  import type { PropType } from 'vue';
  import NoughtSymbol from '@/components/NoughtSymbol.vue';
  import CrossSymbol from '@/components/CrossSymbol.vue';

  export default {
    name: 'BoardView',
    components: { NoughtSymbol, CrossSymbol },
    props: {
      board: {
        type: Board,
        required: true
      },
      playersTurn: {
        type: Number as PropType<Symbol>,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        Symbol,
      }
    },
    created() {
    },
    computed: {
      gameWon() {
        return this.board.winner() !== Symbol.None;
      }
    },
    methods: {
      squareIsFull(symbol: Symbol) {
        return symbol !== Symbol.None;
      },
      pickSquare(i: number) {
        this.board.playMove(i, this.playersTurn)

        if (this.gameWon) {
          this.$emit('win', this.board.winner())
        }

        this.$emit('turn', i);
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
  }

  /* .symbol.nought {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: animateDash .5s linear forwards;
  } */

  /* .symbol.cross {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: animateDash .5s linear forwards infinite;
  }
 */

  
  @keyframes animateDash {
    to {
      stroke-dashoffset: 0;
    }
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
  