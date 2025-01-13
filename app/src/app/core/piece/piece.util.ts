import { SquareUtil } from "../square/square.util";
import { Piece, PieceType, Square } from "../types";

export namespace PieceUtil {

    export const createPiece = (piece: string, square: Square): Piece => {
        switch (piece) {
            case "P":
                return {
                    type: PieceType.Pawn,
                    imgName: "wp.png",
                    isWhite: true,
                    pos: SquareUtil.squareToPos(square),
                    square
                };
            case "R":
                return {
                    type: PieceType.Rook,
                    imgName: "wr.png",
                    isWhite: true,
                    pos: SquareUtil.squareToPos(square),
                    square
                };
            case "N":
                return {
                    type: PieceType.Knight,
                    imgName: "wn.png",
                    isWhite: true,
                    pos: SquareUtil.squareToPos(square),
                    square
                };
            case "B":
                return {
                    type: PieceType.Bishop,
                    imgName: "wb.png",
                    isWhite: true,
                    pos: SquareUtil.squareToPos(square),
                    square
                };
            case "Q":
                return {
                    type: PieceType.Queen,
                    imgName: "wq.png",
                    isWhite: true,
                    pos: SquareUtil.squareToPos(square),
                    square
                };
            case "K":
                return {
                    type: PieceType.King,
                    imgName: "wk.png",
                    isWhite: true,
                    pos: SquareUtil.squareToPos(square),
                    square
                };
            case "p":
                return {
                    type: PieceType.Pawn,
                    imgName: "bp.png",
                    isWhite: false,
                    pos: SquareUtil.squareToPos(square),
                    square
                };
            case "r":
                return {
                    type: PieceType.Rook,
                    imgName: "br.png",
                    isWhite: false,
                    pos: SquareUtil.squareToPos(square),
                    square
                };
            case "n":
                return {
                    type: PieceType.Knight,
                    imgName: "bn.png",
                    isWhite: false,
                    pos: SquareUtil.squareToPos(square),
                    square
                };
            case "b":
                return {
                    type: PieceType.Bishop,
                    imgName: "bb.png",
                    isWhite: false,
                    pos: SquareUtil.squareToPos(square),
                    square
                };
            case "q":
                return {
                    type: PieceType.Queen,
                    imgName: "bq.png",
                    isWhite: false,
                    pos: SquareUtil.squareToPos(square),
                    square
                };
            case "k":
                return {
                    type: PieceType.King,
                    imgName: "bk.png",
                    isWhite: false,
                    pos: SquareUtil.squareToPos(square),
                    square
                };
            default:
                throw new Error("Invalid piece string");
        }
    }
};
