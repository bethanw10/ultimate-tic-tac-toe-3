import { PieceType } from "./PieceType";

export class Board extends Array<PieceType>{
    turn: PieceType = PieceType.Cross; 

    constructor() {
        super();

        for (let i = 0; i < 9; i++) {
            this.push(PieceType.None);
        }
    }

    playMove(i: number) {
        if (this[i] !== PieceType.None) {
            return;
        } 
  
        if (this.turn == PieceType.Cross) {
            this[i] = PieceType.Cross;
            this.turn = PieceType.Nought;
        } else {
            this[i] = PieceType.Nought;
            this.turn = PieceType.Cross;
        }
    }

    winner() : PieceType {
        // columns
        for (let i = 0; i <= 2; i++) {
            if (this[i] !== PieceType.None && 
                this[i] == this[i + 3] && 
                this[i] == this[i + 6]) 
            {
                return this[i];
            }
        }

        // rows
        for (let i = 0; i <= 6; i += 3) {
            if (this[i] !== PieceType.None && 
                this[i] == this[i + 1] && 
                this[i] == this[i + 2])         
            {            
                return this[i];
            }
        }

        // diagonals
        if (this[0] != PieceType.None) {
            if (this[0] == this[4] && this[0] == this[8]) {
                return this[0];
            }
        }

        if (this[2] != PieceType.None) {
            if (this[2] == this[4] && this[2] == this[6]) {
                return this[2];
            }
        }

        return PieceType.None;
    }
}