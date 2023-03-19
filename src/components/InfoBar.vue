<template>
  <div class="info-bar">
    <div class="scores">
      <div class="score">
        <div class="turn" :class="currentTurn == 2 ? 'grey' : 'red'">
          <div>PLAYER</div>
          <img class="turn-symbol" src="/src/assets/one.svg" />
        </div>
        <div class="total">{{ player1Score }}</div>
      </div>

      <div class="vs">vs</div>

      <div class="score">
        <div class="turn" :class="currentTurn == 1 ? 'grey' : 'blue'">
          <div>PLAYER</div>
          <img class="turn-symbol" src="/src/assets/two.svg" />
        </div>
        <div class="total">{{ player2Score }}</div>
      </div>
    </div>
    <img class="reset" @click="resetGame" src="/src/assets/reset.svg" />
  </div>
</template>
  
<script lang="ts">
import { Symbol } from '@/models/SymbolType';
import type { PropType } from 'vue';

export default {
  name: 'ControlsComp',
  props: {
    currentTurn: {
      type: Number as PropType<Symbol>,
      required: true
    },
    player1Score: {
      type: Number
    },
    player2Score: {
      type: Number
    }
  },
  data() {
    return {
      Symbol,
    }
  },
  methods: {
    resetGame() {
      this.$emit("reset-game")
    }
  },
}
</script>
  
<style scoped>
.info-bar {
  height: calc(25vh - 16px);
  width: calc(min(65vh, 100vw) - 32px);
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
  height: 100%;
}

.score {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 2em;
  background: #e6d6ca;
  border-radius: 1vh;
}

.turn {
  padding: 1.5vh 3vh;
  flex: 1;
  border-radius: 1vh 1vh 0 0;
  align-items: center;
  justify-content: space-evenly;
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
  width: 8vh;
  height: 8vh;
  padding: .5vh;
}

.turn.grey .turn-symbol {
  filter: contrast(0%);
}

.total {
  padding: 1vh 0;
}

.vs {
  color: #2b2928;
  font-size: 2em;
  margin: 1.5vh;
}

.reset {
  display: block;
  padding: 2vh;
  cursor: pointer;
  position: absolute;
  height: 8vh;
  background: var(--white);
  border-radius: 2vh;
  right: 0;
}
</style>
  