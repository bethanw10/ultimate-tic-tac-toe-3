<template>
  <div class="board-container">
    <div class="squares grid">
      <template v-for="(squares, y) in board.grid" :key="y">
        <template v-for="(symbol, x) in squares" :key="x">
          <div class="square" :class="{ full: squareIsFull(symbol), disabled: disabled }">
            <div class="choice" v-if="symbol == Symbol.None">
              <div class="s" @click="pickSquare(x, y, Symbol.S)">
                <SSymbol class="symbol" color="#887f79" />
              </div>

              <div class="divider"></div>

              <div class="o" @click="pickSquare(x, y, Symbol.O)">
                <CircleSymbol class="symbol" color="#887f79" />
              </div>
            </div>
            <SSymbol v-if="symbol == Symbol.S" class="symbol" animate color="#666" />
            <CircleSymbol v-if="symbol == Symbol.O" class="symbol" animate color="#666" />

            <template v-for="(sequence, i) in board.sosSequences[y][x]" :key="i">
              <div class="line" :class="[`player${sequence.player}`, sequence.direction.toLowerCase()]"></div>
            </template>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
  
<script lang="ts">
import { SosGrid } from '@/models/SosGrid';
import { Symbol } from '@/models/SymbolType';
import CircleSymbol from '@/components/Symbols/CircleSymbol.vue';
import SSymbol from '@/components/Symbols/SSymbol.vue';
import "@/styles/variables.css";

export default {
  name: 'SosBoardView',
  components: { CircleSymbol, SSymbol },
  props: {
    board: {
      type: SosGrid,
      required: true
    },
    playersTurn: {
      type: Number,
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
      return false;
    }
  },
  methods: {
    squareIsFull(symbol: Symbol) {
      return symbol !== Symbol.None;
    },
    pickSquare(x: number, y: number, symbol: Symbol) {
      let sosMade = this.board.playMove(x, y, symbol, this.playersTurn)

      console.log(sosMade);
      // if (this.gameWon) {
      //   this.$emit('win', this.board.winner())
      // }

      this.$emit('turn', sosMade);
    },
  },
}
</script>
  
<style scoped>

.board-container {
  display: flex;
  position: relative;
  font-family: 'Roboto', sans-serif;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 1%;
}

.squares,
.square,
.overlay,
.overlay-square,
.winning-symbol {
  height: 100%;
  width: 100%;
}

.squares {
  position: relative;
}

.square {
  position: relative;
  border-radius: 10%;
  cursor: pointer;
  background: var(--white);
}

.line {
  width: 210%;
  position: absolute;
  top: calc(50% - 0.5vmin);
  right: 50%;
  border-radius: 1vmin;
  z-index: 10;
  transform-origin: right;
  border-bottom: 1.2vmin solid var(--red);
  animation-name: appear;
  animation-duration: .2s;
}

@keyframes appear {
  from {width: 0%;}
}

.line.player2 {
  border-color: var(--blue);
}

.line.northwest {
  transform: rotate(45deg);
}

.line.north {
  transform: rotate(90deg);
}

.line.northeast {
  transform: rotate(135deg);
}

.line.east {
  transform: rotate(180deg);
}

.line.southeast {
  transform: rotate(225deg);
}

.line.south {
  transform: rotate(270deg);
}

.line.southwest {
  transform: rotate(315deg);
}

.line.northwest,
.line.northeast,
.line.southeast,
.line.southwest {
  width: 296.98%;
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
  margin: 15%;
  display: block;
}

.choice {
  height: 100%;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  display: none;
}

.choice .symbol {
  margin: 15%;
}

.square:active .choice {
  display: flex;
}

@media (hover: hover) {
  .square:hover .choice {
    display: flex;
  }

  .o:hover .symbol,
  .s:hover .symbol {
    margin: 10%;
  }
}

.s,
.o {
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
}

.divider {
  content: '';
  width: 5%;
  height: 80%;
  background: #0000001f;
  border-radius: 2em;
  pointer-events: none;
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
  