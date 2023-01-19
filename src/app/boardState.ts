import { Tile } from "./models/tile.model";

export interface BoardState {
    fen: string;
    tiles: Tile[];
    deadPieces: string[];
    moves: string[];
}