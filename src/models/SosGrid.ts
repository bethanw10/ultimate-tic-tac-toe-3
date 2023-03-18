import { Directions, type Direction } from "./Direction";
import { Symbol } from "./SymbolType";

interface SosSequence {
    direction: string;
    player: number;
}

export class SosGrid {
    size = 5;

    sosSequences: SosSequence[][][] = []
    grid: Symbol[][] = []

    constructor() {
        for (let i = 0; i < this.size; i++) {
            this.grid[i] = [];

            for (let j = 0; j < this.size; j++) {
                this.grid[i][j] = Symbol.None;
            }
        }

        for (let i = 0; i < this.size; i++) {
            this.sosSequences[i] = [];

            for (let j = 0; j < this.size; j++) {
                this.sosSequences[i][j] = [];
            }
        }
    }

    playMove(x: number, y: number, symbol: Symbol, player: number) {
        if (this.grid[y][x] !== Symbol.None) {
            return;
        }

        this.grid[y][x] = symbol;

        const newSos = this.newSosSequences(x, y, symbol, player);
        return newSos.length;
    }

    newSosSequences(x: number, y: number, symbol: Symbol, player: number): SosSequence[] {
        const newSos = [];

        if (symbol == Symbol.S) {
            for (const [direction, delta] of Object.entries(Directions.All)) {
                const [dx, dy] = [delta.x, delta.y];
                const [x1, y1] = [x + dx, y + dy];
                const [x2, y2] = [x + dx * 2, y + dy * 2];

                if (this.grid[y1] && this.grid[y1][x1] == Symbol.O &&
                    this.grid[y2] && this.grid[y2][x2] == Symbol.S) {

                    newSos.push({ player, direction: direction });
                    this.sosSequences[y][x].push({ player, direction })
                }
            }
        } else if (symbol == Symbol.O) {
            for (const [direction, delta] of Object.entries(Directions.Half)) {
                const [dx, dy] = [delta.x, delta.y];
                const [x1, y1] = [x - dx, y - dy];
                const [x2, y2] = [x + dx, y + dy];

                if (this.grid[y1] && this.grid[y1][x1] == Symbol.S &&
                    this.grid[y2] && this.grid[y2][x2] == Symbol.S) {

                    newSos.push({ player, direction: direction });
                    this.sosSequences[y1][x1].push({ player, direction })
                }
            }
        }

        return newSos;
    }

    isBoardFull() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] !== Symbol.None) {
                    return false;
                }
            }
        }

        return true;
    }

    reset() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.grid[i][j] = Symbol.None;
                this.sosSequences[i][j] = [];
            }
        }
    }
}