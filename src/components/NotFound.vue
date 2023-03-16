<template>
    <div class="not-found">
        <div>Page Not Found</div>
        <div class="board-container">
            <div class="squares nine-by-nine-grid">
                <template v-for="i in 9" :key="i">
                    <div class="square">
                        <img v-if="i == 4 || i == 6" class="symbol" src="/src/assets/four.svg" />
                        <NoughtSymbol v-if="i == 5" class="symbol cross" />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
    
<script lang="ts">
import { Symbol } from '@/models/SymbolType';
import NoughtSymbol from '@/components/NoughtSymbol.vue';

export default {
    name: 'BoardView',
    components: { NoughtSymbol },
    data() {
        return {
            Symbol,
        }
    }
}
</script>
    
<style scoped>
.not-found {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    color: #ddd;
    font-size: 4em;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
}

.board-container {
    display: flex;
    position: relative;
    font-family: 'Roboto', sans-serif;
    flex-wrap: wrap-reverse;
    margin: 16px 16px 16px 16px;
    height: calc(min(80vh, 100vw) - 32px);
    width: calc(min(80vh, 100vw) - 32px);
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

.squares,
.square,
.symbol,
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
    padding: 15%;
    background: rgb(230 214 202);
}

.symbol {
    display: block;
}
</style>
    