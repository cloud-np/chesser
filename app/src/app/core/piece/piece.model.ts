type PieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king" | "empty";

export interface Piece {
    type: PieceType;
    imgName: string;
    isWhite: boolean;
};
