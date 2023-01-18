import { BoardState } from "../boardState";
import { Piece } from "../piece.model";
import { Tile } from "../tile.model";

export const fenTranslator = (fen: string): BoardState => {
    const pieces = fen.split(' ')[0];
    const boardRows: Tile[][] = [...Array(8)].map((_, x) => [...Array(8)].map((_, y) => {
        let changeRowStartingColor = x % 2 === 0 ? 0 : 1;
        let square: number = x * 8 + y;
        return new Tile((square + changeRowStartingColor) % 2 === 0, square)
    }));

    let square = 0;
    pieces.split('/').map((row) => {
        row.split('').map((piece) => {
            if (isNaN(parseInt(piece))) {
                const tile = boardRows[Math.floor(square / 8)][square % 8];
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
        boardRows: boardRows,
        deadPieces: [],
        moves: [],
    }
}