<template>
    <div class="overlay three-by-three-grid">
        <template v-for="(_, i) in gridSize" :key="i">
            <div v-if="player1Win" class="overlay-square red"></div>
            <div v-if="!player1Win" class="overlay-square blue"></div>
            <div v-if="disabled" class="overlay-square disabled"></div>
        </template>
    </div>
    <div class="winner">
        <component :is="player1Symbol" v-if="player1Win" class="winning-symbol" />
        <TwoSymbolVue :is="player2Symbol" v-if="!player1Win" class="winning-symbol" />
    </div>
</template>
    
<script lang="ts">
import { Symbol } from '@/models/SymbolType';
import CircleSymbol from '@/components/Symbols/CircleSymbol.vue';

export default {
    name: 'BoardView',
    components: { CircleSymbol },
    data() {
        return {
            Symbol,
        }
    },
    props: {
        gridSize: {
            type: Number,
            required: true
        },
        player1Symbol: {
            type: String,
            default: "OneSymbol"
        },
        player2Symbol: {
            type: String,
            default: "TwoSymbol"
        },
        player1Win: {
            type: Boolean
        },
        disabled: {
            type: Boolean,
        },
    },
}
</script>
    
<style scoped>
.three-by-three-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 2%;
}
.squares,
.square,
.symbol,
.overlay,
.overlay-square,
.winning-symbol {
  height: 100%;
  width: 100%;
}

.overlay {
  position: absolute;
  pointer-events: none;
}

.overlay-square {
  position: relative;
  border-radius: 10%;
}

.overlay-square.red {
  background-color: rgba(99, 39, 42, 0.8);
}

.overlay-square.blue {
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
    