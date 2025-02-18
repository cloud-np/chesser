import {Piece, Square} from "../types";

export interface BoardState {
    fen: string;
    pieces: Record<Square, Piece>;
    deadPieces: string[];
    moves: string[];
    boardSize: number;
    isWhiteView: boolean;
}

