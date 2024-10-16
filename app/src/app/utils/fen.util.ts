import { BoardState } from "../core/board/board.model";
import { BoardUtil } from "../core/board/board.util";
import { PieceType } from "../core/piece/piece.model";
import { PieceUtil } from "../core/piece/piece.util";
import { Square } from "../core/square/square.model";
import { SquareUtil } from "../core/square/square.util";
import { Tile } from "../core/tile/tile.model";

export const fenTranslator = (fen: string): Omit<BoardState, 'boardSize' | 'isWhiteView' | 'boardSquareOrder'> => {
    const tiles: Record<Square, Tile> = BoardUtil.generateTiles();
    let rank = 7;
    let file = 0;

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
            const piece = PieceUtil.stringToPiece(ch);
            if (piece.type !== PieceType.Empty) {
                const square = SquareUtil.getSquareFromRankAndFile(rank, file);
                const tile = tiles[square];
                tile.squareName = SquareUtil.getSquareName(square);
                tile.piece = piece;
                file++;
            }
        }
    });

    return {
        fen,
        tiles,
        deadPieces: [],
        moves: []
    }
}
