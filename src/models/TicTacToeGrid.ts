import { GameState } from "./GameState";
import { Symbol } from "./Symbol";

export class TicTacToeGrid extends Array<Symbol>{

    constructor() {
        super();

        for (let i = 0; i < 9; i++) {
            this.push(Symbol.None);
        }
    }

    playMove(i: number, symbol: Symbol) {
        if (this[i] !== Symbol.None) {
            return;
        }

        this[i] = symbol;
    }

    reset() {
        for (const i in this) {
            this[i] = Symbol.None;
        }
    }

    isFull() {
        for (const i in this) {
            if (this[i] == Symbol.None) {
                return false;
            }
        }

        return true
    }

    winner(): GameState {
        // columns
        for (let i = 0; i <= 2; i++) {
            if (this[i] !== Symbol.None &&
                this[i] == this[i + 3] &&
                this[i] == this[i + 6]) {
                    
                return this[i] == Symbol.Cross ? GameState.CrossWins : GameState.NoughtWins;
            }
        }

        // rows
        for (let i = 0; i <= 6; i += 3) {
            if (this[i] !== Symbol.None &&
                this[i] == this[i + 1] &&
                this[i] == this[i + 2]) {

                return this[i] == Symbol.Cross ? GameState.CrossWins : GameState.NoughtWins;
            }
        }

        // diagonal upper left
        if (this[0] != Symbol.None) {
            if (this[0] == this[4] && this[0] == this[8]) {
                return this[0] == Symbol.Cross ? GameState.CrossWins : GameState.NoughtWins;;
            }
        }

        // diagonal upper right
        if (this[2] != Symbol.None) {
            if (this[2] == this[4] && this[2] == this[6]) {
                return this[2] == Symbol.Cross ? GameState.CrossWins : GameState.NoughtWins;;
            }
        }

        return this.isFull() ? GameState.Draw : GameState.InProgress;
    }
}