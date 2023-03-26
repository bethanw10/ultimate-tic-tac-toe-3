<template>
    <div class="overlay grid" :style="gridStyle">
        <template v-for="(_, i) in gridSize * gridSize" :key="i">
            <div v-if="disabled" class="overlay-square disabled"></div>
            <template v-else>
                <div v-if="player1Win" class="overlay-square red"></div>
                <div v-if="!player1Win" class="overlay-square blue"></div>
            </template>
        </template>
    </div>
    <div class="winner-info">

        <div class="winner" v-if="!disabled">
            <component :is="player1Symbol" v-if="player1Win" class="winning-symbol" />
            <component :is="player2Symbol" v-if="!player1Win" class="winning-symbol" />
            <div>wins!</div>
        </div>

        <div class="replay">
            <ReplaySymbol class="replay-symbol" @click="$emit('reset-game')" color="var(--white)"/>
            <!-- Replay? -->
        </div>
    </div>

</template>
    
<script lang="ts">
import ReplaySymbol from './Symbols/ReplaySymbol.vue';

export default {
    name: "WinnerOverlay",
    components: { ReplaySymbol },
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
    computed: {
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
    