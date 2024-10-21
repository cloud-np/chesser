import { BoardUtil } from "../board/board.util";
import { Piece, PieceType } from "./piece.model";

export namespace PieceUtil {

    export const empty = (): Piece => {
        return {
            type: PieceType.Empty,
            imgName: "",
            isWhite: false
        };
    }

    export const stringToPiece = (piece: string): Piece => {
        switch (piece) {
            case "P":
                return {
                    type: PieceType.Pawn,
                    imgName: "wp.png",
                    isWhite: true
                };
            case "R":
                return {
                    type: PieceType.Rook,
                    imgName: "wr.png",
                    isWhite: true
                };
            case "N":
                return{
                    type: PieceType.Knight,
                    imgName: "wn.png",
                    isWhite: true
                };
            case "B":
                return {
                    type: PieceType.Bishop,
                    imgName: "wb.png",
                    isWhite: true
                };
            case "Q":
                return {
                    type: PieceType.Queen,
                    imgName: "wq.png",
                    isWhite: true
                };
            case "K":
                return {
                    type: PieceType.King,
                    imgName: "wk.png",
                    isWhite: true
                };
            case "p":
                return {
                    type: PieceType.Pawn,
                    imgName: "bp.png",
                    isWhite: false
                };
            case "r":
                return {
                    type: PieceType.Rook,
                    imgName: "br.png",
                    isWhite: false
                };
            case "n":
                return {
                    type: PieceType.Knight,
                    imgName: "bn.png",
                    isWhite: false
                };
            case "b":
                return {
                    type: PieceType.Bishop,
                    imgName: "bb.png",
                    isWhite: false
                };
            case "q":
                return {
                    type: PieceType.Queen,
                    imgName: "bq.png",
                    isWhite: false
                };
            case "k":
                return {
                    type: PieceType.King,
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
