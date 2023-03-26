<template>
    <div class="overlay grid" :style="gridStyle">
        <template v-for="(_, i) in gridSize * gridSize" :key="i">
            <template v-if="!disabled">
                <div v-if="redPlayerWins" class="overlay-square red"></div>
                <div v-if="bluePlayerWins" class="overlay-square blue"></div>
                <div v-if="result == GameState.Draw" class="overlay-square grey"></div>
            </template>
            <div v-else class="overlay-square grey"></div>
        </template>
    </div>
    <div class="winner-info">

        <div class="winner" v-if="!disabled">
            <div v-if="result == GameState.Draw">Draw</div>
            <template v-else>
                <component :is="player1Symbol" v-if="redPlayerWins" class="winning-symbol" />
                <component :is="player2Symbol" v-if="bluePlayerWins" class="winning-symbol" />
                <div>wins!</div>
            </template>
        </div>

        <div class="replay">
            <ReplaySymbol class="replay-symbol" @click="$emit('reset-game')" color="var(--white)" />
        </div>
    </div>
</template>
    
<script lang="ts">
import { GameState } from '@/models/GameState';
import type { PropType } from 'vue';
import ReplaySymbol from './Symbols/ReplaySymbol.vue';

export default {
    name: "WinnerOverlay",
    components: { ReplaySymbol },
    data() { return { GameState } },
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
        result: {
            type: Number as PropType<GameState>,
            required: true
        },
        disabled: {
            type: Boolean,
        },
    },
    computed: {
        redPlayerWins() {
            return this.result == GameState.CrossWins || this.result == GameState.Player1Wins;
        },
        bluePlayerWins() {
            return this.result == GameState.NoughtWins || this.result == GameState.Player2Wins;
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

.overlay-square.grey {
    background-color: rgba(85, 85, 85, 0.8);
}

.winner-info {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 30;

    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
        "."
        "main"
        "replay";

    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: Nice Sugar;
    background-color: #333333ab;
}

.winner {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10vmin;
    padding: 5vmin;
    gap: 2vmin;
    grid-area: main;
}

.winning-symbol {
    display: block;
    height: 15vmin;
    width: 15vmin;
}

.replay {
    grid-area: replay;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 3vmin;
    cursor: pointer;
    gap: 1vmin;
}

.replay-symbol {
    height: 10vmin;
    width: 10vmin;
}
</style>
    