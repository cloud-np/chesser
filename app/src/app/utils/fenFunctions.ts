import { BoardState } from "../boardState";
import { Piece } from "../models/piece.model";
import { Tile } from "../models/tile.model";

export const fenTranslator = (fen: string): BoardState => {
    const pieces = fen.split(' ')[0];
    const boardRows: Tile[] = [...Array(64)].map((_, sq) => {
        let changeRowStartingColor = (Math.floor((sq / 8)) % 2) === 0 ? 0 : 1;
        return new Tile((sq + changeRowStartingColor) % 2 === 0, sq)
    });

    let square = 0;
    pieces.split('/').map((row) => {
        row.split('').map((piece) => {
            if (isNaN(parseInt(piece))) {
                const tile = boardRows[square];
                tile.setPiece(Piece.stringToPiece(piece));
                ++square;
            } else {
                for (let i = 0; i < parseInt(piece); i++) {
                    ++square;
                }
            }
        });
    });

    return {
        fen: fen,
        tiles: boardRows,
        deadPieces: [],
        moves: [],
    }
}