import { Tile } from "./tile.model";

export interface BoardState {
    fen: string;
    boardRows: Tile[][];
    deadPieces: string[];
    moves: string[];
}