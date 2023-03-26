<template>
    <div class="overlay grid" :style="gridStyle">
        <template v-for="(_, i) in gridSize * gridSize" :key="i">
            <div v-if="disabled" class="overlay-square disabled"></div>
            <template v-else>
                <div v-if="crossIsWinner" class="overlay-square red"></div>
                <div v-else class="overlay-square blue"></div>
            </template>
        </template>
    </div>
    <div class="winner" v-if="!disabled">
        <CrossSymbolVue v-if="crossIsWinner" class="winning-symbol" />
        <CircleSymbolVue v-else class="winning-symbol" />
    </div>
</template>
    
<script lang="ts">
import CircleSymbolVue from '../Symbols/CircleSymbol.vue';
import CrossSymbolVue from '../Symbols/CrossSymbol.vue';
import { Symbol } from '@/models/Symbol'
import type { PropType } from 'vue';

export default {
    name: "WinnerOverlay",
    components: { CrossSymbolVue, CircleSymbolVue },
    props: {
        gridSize: {
            type: Number,
            required: true
        },
        winner: {
            type: Number as PropType<Symbol>,
        },
        disabled: {
            type: Boolean,
        },
    },
    computed: {
        crossIsWinner() {
            return this.winner == Symbol.Cross;
        },
        gridStyle() {
            return {
                gridTemplateRows: `repeat(${this.gridSize}, 1fr)`,
                gridTemplateColumns: `repeat(${this.gridSize}, 1fr)`
            };
        }
    },
}
</script>
    
<style scoped>
.grid {
    display: grid;
    grid-gap: 2%;
    z-index: 20;
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
    border-radius: 1vh;
}

.overlay-square.red {
    background-color: rgba(99, 39, 42, 0.8);
}

.overlay-square.blue {
    background-color: rgba(44, 92, 107, 0.8);
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
    z-index: 30;
}

.winning-symbol {
    display: block;
    padding: 15%;
}
</style>
    