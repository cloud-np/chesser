import { Square } from "../square/square.model";

export enum PieceType {
    Pawn = "pawn",
    Rook = "rook",
    Knight = "knight",
    Bishop = "bishop",
    Queen = "queen",
    King = "king",
    Empty = "empty",
}

export interface Piece {
    type: PieceType;
    imgName: string;
    isWhite: boolean;
};

export interface PieceWithSquare extends Piece {
    square: Square;
    piecePos: Square;
    squareName: string;
}
