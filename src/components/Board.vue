<template>
    <div class="board-container">
      <div class="squares">
        <template v-for="(piece, i) in board" :key="i">
            <div class="square light" @click="pickSquare(i)" :class="{full: squareIsFull(piece)}">
              <img v-if="piece == PieceType.Nought" class="piece" src="/src/assets/circle.svg"/>
              <img v-if="piece == PieceType.Cross" class="piece" src="/src/assets/cross.svg"/>
            </div>
        </template>
      </div>
      <div class="overlay" v-if="gameWon">
        <template v-for="(piece, i) in board" :key="i">
          <div v-if="board.winner() == PieceType.Nought" class="overlay-square naughts"></div>
          <div v-if="board.winner() == PieceType.Cross" class="overlay-square crosses"></div>
        </template>
      </div>
      <div class="winner" v-if="gameWon">
        <img v-if="board.winner() == PieceType.Nought" class="winning-piece" src="/src/assets/circle.svg"/>
        <img v-if="board.winner() == PieceType.Cross" class="winning-piece" src="/src/assets/cross.svg"/>
      </div>
    </div>
  </template>
  
<script lang="ts">
  import { Board } from '@/models/Board';
  import { PieceType } from '@/models/PieceType';

  
  export default {
    name: 'BoardView',
    components: {},
    data() {
      return {
        board: new Board(),
        crossesTurn: true,
        PieceType,
      }
    },
    created() {
    },
    computed: {
      gameWon() {
        return this.board.winner() !== PieceType.None
      }
    },
    methods: {
      squareIsFull(piece: PieceType) {
        return piece !== PieceType.None;
      },
      pickSquare(i: number) {
        this.board.playMove(i)
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
    color: #ddd;
  }
  .squares {
    position: relative;
    display: grid;
    margin: 32px 16px;
    height: calc(min(100vh, 100vw) - 64px);
    width: calc(min(100vh, 100vw) - 64px);

    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 2%;
  }

  .winner {
    position: absolute;
    height: calc(min(100vh, 100vw) - 64px);
    width: calc(min(100vh, 100vw) - 64px);
    margin: 32px 16px;
  }

  .winning-piece {
    width: 100%;
    height: 100%;
    display: block;
    padding: 15%;
  }

  .overlay { 
    position: absolute;
    display: grid;
    margin: 32px 16px;
    height: calc(min(100vh, 100vw) - 64px);
    width: calc(min(100vh, 100vw) - 64px);
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 2%;
  }

  .overlay-square {
    width: 100%;
    height: 100%;
    position: relative;    
    border-radius: 10%;
  }

  .overlay-square.crosses {    
    background-color: #5a2528a9;
  }

  .overlay-square.naughts {
    background-color: #34474ea1;
  }

  @media only screen and (max-width: 750px) {
    .squares {
      margin: 16px;
    }
  }

  .square {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 10%;
    padding: 15%;
    cursor: pointer;
  }

  .square.full {
    cursor: auto;
    pointer-events: none;
  }

  .piece {
    width: 100%;
    height: 100%;
    display: block;
    z-index: 5;
    user-select: none;
  }

  .square.light {
    background: rgb(230 214 202);
  }
  
  .square.dark {
    background: rgb(171 125 104);
  }
  </style>
  