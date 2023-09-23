import { Piece } from "./piece.model";

export namespace PieceUtil {

    export const empty = (): Piece => {
        return {
            type: "empty",
            imgName: "",
            isWhite: false
        };
    }

    export const stringToPiece = (piece: string): Piece => {
        switch (piece) {
            case "P":
                return {
                    type: "pawn",
                    imgName: "wp.png",
                    isWhite: true
                };
            case "R":
                return {
                    type: "rook",
                    imgName: "wr.png",
                    isWhite: true
                };
            case "N":
                return{
                    type: "knight",
                    imgName: "wn.png",
                    isWhite: true
                };
            case "B":
                return {
                    type: "bishop",
                    imgName: "wb.png",
                    isWhite: true
                };
            case "Q":
                return {
                    type: "queen",
                    imgName: "wq.png",
                    isWhite: true
                };
            case "K":
                return {
                    type: "king",
                    imgName: "wk.png",
                    isWhite: true
                };
            case "p":
                return {
                    type: "pawn",
                    imgName: "bp.png",
                    isWhite: false
                };
            case "r":
                return {
                    type: "rook",
                    imgName: "br.png",
                    isWhite: false
                };
            case "n":
                return {
                    type: "knight",
                    imgName: "bn.png",
                    isWhite: false
                };
            case "b":
                return {
                    type: "bishop",
                    imgName: "bb.png",
                    isWhite: false
                };
            case "q":
                return {
                    type: "queen",
                    imgName: "bq.png",
                    isWhite: false
                };
            case "k":
                return {
                    type: "king",
                    imgName: "bk.png",
                    isWhite: false
                };
            case " ":
                return PieceUtil.empty();
            default:
                throw new Error("Invalid piece string");
        }
    }
};
