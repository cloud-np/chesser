import { Piece } from "../types";

export interface BoardState {
    fen: string;
    pieces: Piece[];
    deadPieces: string[];
    moves: string[];
    boardSize: number;
    isWhiteView: boolean;
}

