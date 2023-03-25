<template>
  <div class="info-bar">
    <div class="scores">
      <div class="score">
        <div class="turn" :class="currentTurn == 2 ? 'grey' : 'red'">
          <div class="player">PLAYER</div>
          <slot name="player1">
            <OneSymbol />
          </slot>
        </div>
        <div v-if="showScores" class="total">{{ player1Score }}</div>
      </div>

      <div class="vs">vs</div>

      <div class="score">
        <div class="turn" :class="currentTurn == 1 ? 'grey' : 'blue'">
          <div class="player">PLAYER</div>
          <slot name="player2">
            <TwoSymbol />
          </slot>
        </div>
        <div v-if="showScores" class="total">{{ player2Score }}</div>
      </div>
    </div>
    <img class="reset" @click="resetGame" src="/src/assets/reset.svg" />
  </div>
</template>
  
<script lang="ts">
import { Symbol } from '@/models/Symbol';
import type { PropType } from 'vue';
import OneSymbol from './Symbols/OneSymbol.vue';
import TwoSymbol from './Symbols/TwoSymbol.vue';

export default {
  name: "ControlsComp",
  components: { OneSymbol, TwoSymbol },
  props: {
    currentTurn: {
      type: Number as PropType<Symbol>,
      required: true
    },
    showScores: {
      type: Boolean
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
    };
  },
  methods: {
    resetGame() {
      this.$emit("reset-game");
    }
  },
}
</script>
  
<style scoped>
.info-bar {
  height: 25vh;
  width: min(65vh, 100vw);
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
  font-size: 4vh;
  background: #e6d6ca;
  border-radius: 1vh;
}

.turn {
  padding: 1.5vh 3vh;
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  font-size: small;
  font-variant: small-caps;
  color: white;
  position: relative;
  border-radius: 1vh 1vh 0 0;
  letter-spacing: .1em;
}

.turn:only-child {
  border-radius: 1vh;
}

.turn::before {
  content: '';
  position: absolute;
  top: 0;
  border-left: 1.2vh solid transparent;
  border-right: 1.2vh solid transparent;
  border-top: 1.2vh solid transparent;
}

.turn.red::before {
  border-top: 1.2vh solid var(--red);
}

.turn.blue::before {
  border-top: 1.2vh solid var(--blue);
}

.turn.red {
  background-color: #f75c6698;
}

.turn.blue {
  background-color: #4798b683;
}

.turn.grey {
  background-color: #aaa;
}

.turn :not(.player) {
  display: block;
  width: 8vh;
  height: 8vh;
  padding: .5vh;
}

.turn.grey :not(.player) {
  filter: contrast(0%);
}

.player {
  margin-bottom: 1.5vh;
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
  