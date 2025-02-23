import { BoardState } from "../core/board/board.model";
import { PieceUtil } from "../core/piece/piece.util";
import { SquareUtil } from "../core/square/square.util";
import { PieceType, Piece, Pos } from "../core/types";

export const fenDecoder = (fen: string, isWhiteView = true): Omit<BoardState, 'boardSize' | 'isWhiteView' | 'boardSquareOrder'> => {
    let rank = isWhiteView ? 0 : 7;
    let file = 0;
    const pieces: Piece[] = [];

    fen.split('').forEach(ch => {
        if ("1234567890".includes(ch)) {
            file += parseInt(ch) - parseInt('0');
        } else if (ch === '/') {
            rank = isWhiteView ? rank + 1 : rank - 1;
            file = 0;
        } else if (ch === ' ') {
            throw new Error("Not yet ready.");
        } else {
            // TODO: We will need to change this to BitBoard represantion so we can swap between White/Black easily OR
            // we will need to make a swap func I assume.
            // NOTE: Not needed most likely. But it would be interesting to see this representation in js.
            const pos: Pos = [file, rank];
            const square = SquareUtil.posToSquare(pos);
            const piece = PieceUtil.createPiece(ch, square);
            if (piece.type !== PieceType.Empty) {
                // const tile = tiles[square];
                // tile.squareName = SquareUtil.getSquareName(square);
                // tile.piece = piece;
                pieces.push(piece);
                file++;
            }
        }
    });

    return {
        fen,
        pieces,
        deadPieces: [],
        moves: []
    }
}

export const fenEncoder = (state: BoardState): string => {
    return state.fen;
}
