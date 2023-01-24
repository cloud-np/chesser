// export interface Piece {
// }
type PieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king" | "empty";

export class Piece {
    imgName: string;
    isWhite: boolean;
    type: PieceType;

    constructor(type: PieceType, imgName: string, isWhite: boolean) {
        this.type = type;
        this.imgName = imgName;
        this.isWhite = isWhite;
    }

    static empty(): Piece {
        return new Piece("empty", "", false);
    }

    static stringToPiece(piece: string): Piece {
        switch (piece) {
            case "P":
                return new Piece("pawn", "wp.png", true);
            case "R":
                return new Piece("rook", "wr.png", true);
            case "N":
                return new Piece("knight", "wn.png", true);
            case "B":
                return new Piece("bishop", "wb.png", true);
            case "Q":
                return new Piece("queen", "wq.png", true);
            case "K":
                return new Piece("king", "wk.png", true);
            case "p":
                return new Piece("pawn", "bp.png", false);
            case "r":
                return new Piece("rook", "br.png", false);
            case "n":
                return new Piece("knight", "bn.png", false);
            case "b":
                return new Piece("bishop", "bb.png", false);
            case "q":
                return new Piece("queen", "bq.png", false);
            case "k":
                return new Piece("king", "bk.png", false);
            case " ":
                return Piece.empty();
            default:
                throw new Error("Invalid piece string");
        }
    }
}