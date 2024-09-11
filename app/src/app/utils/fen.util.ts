import { BoardState } from "../core/board/board.model";
import { BoardUtil } from "../core/board/board.util";
import { PieceType } from "../core/piece/piece.model";
import { PieceUtil } from "../core/piece/piece.util";
import { SquareUtil } from "../core/square/square.util";
import { Tile } from "../core/tile/tile.model";

export const fenTranslator = (fen: string): Omit<BoardState, 'boardSize'> => {

    const tiles: Tile[] = BoardUtil.generateTiles();
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
            const piece = PieceUtil.stringToPiece(ch);
            if (piece.type !== PieceType.Empty) {
                // reverse? 63 -
                const square = SquareUtil.getSquareFromRankAndFile(rank, file);
                const tile = tiles[square];
                tile.squareName = SquareUtil.getSquareName(square);
                tile.piece = piece;
                file++;
            }
        }
    });
    console.log(tiles.map(tile => tile.squareName));

    return {
        fen,
        tiles: tiles,
        deadPieces: [],
        moves: [],
    }
}
