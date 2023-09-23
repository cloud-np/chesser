import { Tile } from "./core/tile/tile.model";

export interface BoardState {
    fen: string;
    tiles: Tile[];
    deadPieces: string[];
    moves: string[];
}
