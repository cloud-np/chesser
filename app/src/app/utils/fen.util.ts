import { BoardState } from "../core/board/board.model";
import { PieceUtil } from "../core/piece/piece.util";
import { SquareUtil } from "../core/square/square.util";
import { Piece, PieceType, Square } from "../core/types";

export const fenTranslator = (fen: string): Omit<BoardState, 'boardSize' | 'isWhiteView' | 'boardSquareOrder'> => {
    let rank = 7;
    let file = 0;
    const pieces = {} as Record<Square, Piece>;

    fen.split('').forEach(ch => {
        if ("1234567890".includes(ch)) {
            file += parseInt(ch) - parseInt('0');
        } else if (ch === '/') {
            --rank;
            file = 0;
        } else if (ch === ' ') {
            throw new Error("Not yet ready.");
        } else {
            // TODO: We will need to change this to BitBoard represantion so we can swap between White/Black easily OR
            // we will need to make a swap func I assume.
            // NOTE: Not needed most likely. But it would be interesting to see this representation in js.
            const square = SquareUtil.posToSquare([rank, file]);
            const piece = PieceUtil.createPiece(ch, square);
            if (piece.type !== PieceType.Empty) {
                // const tile = tiles[square];
                // tile.squareName = SquareUtil.getSquareName(square);
                // tile.piece = piece;
                pieces[square] = piece;
                file++;
            }
        }
    });

    console.log("!! ", pieces);
    return {
        fen,
        pieces,
        deadPieces: [],
        moves: []
    }
}
