import { Piece } from "../piece/piece.model";
import { Square } from "../square/square.model";
import { Tile } from "../tile/tile.model";

export interface BoardState {
    fen: string;
    tiles: Record<Square, Tile>;
    pieces: Record<Square, Piece>;
    deadPieces: string[];
    moves: string[];
    boardSize: number;
    isWhiteView: boolean;
}

