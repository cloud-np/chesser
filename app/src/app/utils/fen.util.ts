import { BoardState } from "../core/board/board.model";
import { PieceUtil } from "../core/piece/piece.util";
import { Tile } from "../core/tile/tile.model";
import { TileUtil } from "../core/tile/tile.util";

export const fenTranslator = (fen: string): Omit<BoardState, 'boardSize'> => {
    const pieces = fen.split(' ')[0];

    const boardRows: Tile[] = [...Array(64)].map((_, sq) => {
        let changeRowStartingColor = (Math.floor((sq / 8)) % 2) === 0 ? 0 : 1;
        return TileUtil.createTile((sq + changeRowStartingColor) % 2 === 0, sq);
    });

    let square = 0;
    pieces.split('/').map((row) => {
        row.split('').map((piece) => {
            if (isNaN(parseInt(piece))) {
                const tile = boardRows[square];
                tile.piece = PieceUtil.stringToPiece(piece);
                ++square;
            } else {
                for (let i = 0; i < parseInt(piece); i++) {
                    ++square;
                }
            }
        });
    });

    return {
        fen,
        tiles: boardRows,
        deadPieces: [],
        moves: [],
    }
}
