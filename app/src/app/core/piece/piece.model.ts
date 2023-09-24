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
