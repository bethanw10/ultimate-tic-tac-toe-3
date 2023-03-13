<template>
    <div class="board-container">
      <div class="squares tic-tac-toe-grid">
        <template v-for="(_, i) in board" :key="i">
            <BoardVue @win="subGameWon(i, $event)"></BoardVue>
        </template>
      </div>
      <div class="overlay tic-tac-toe-grid" v-if="gameWon">
        <template v-for="(_, i) in board" :key="i">
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
  import  BoardVue from './Board.vue';

  export default {
    components: { BoardVue },
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
      subGameWon(i: number, piece: PieceType) {
        this.board.placePiece(i, piece);
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

  .tic-tac-toe-grid {
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

  .winning-piece {
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
  