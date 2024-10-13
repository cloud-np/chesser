import { Piece } from "../piece/piece.model";
import { Square } from "../square/square.model";

export interface Tile {
    squareName: string;
    piece: Piece;
    isWhite: boolean;
    square: Square;
};

// export class Tile {
//     squareName: string;
//     piece: Piece;
//     isWhite: boolean;
//     coords: number[];
//     square: Square;

//     constructor(isWhite: boolean, square: Square) {
//         this.piece = Piece.empty();
//         this.isWhite = isWhite;
//         this.coords = [square % 8, Math.floor(square / 8)]
//         this.square = square;
//         this.squareName = Tile.squareNameFromCoords(this.coords);
//     }

//     setPiece(piece: Piece) {
//         this.piece = piece;
//     }

//     static squareNameFromCoords(coords: number[]): string {
//         return String.fromCharCode(97 + coords[1]) + (8 - coords[0]);
//     }

// }
