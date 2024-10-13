import { Square } from "../square/square.model";
import { Tile } from "../tile/tile.model";

export interface BoardState {
    fen: string;
    tiles: Record<Square, Tile>;
    deadPieces: string[];
    moves: string[];
    boardSize: number;
    isWhiteView: boolean;
    boardSquareOrder: Square[];
}

