import { Tile } from "../tile/tile.model";
import { Square } from "../square/square.model";
import { PieceUtil } from "../piece/piece.util";
import { PieceType } from "../piece/piece.model";
import { BoardUtil } from "../board/board.util";
import { SquareUtil } from "../square/square.util";

export namespace TileUtil {

    export const createTile = (isWhite: boolean, square: Square): Tile => ({
        piece: PieceUtil.empty(),
        isWhite,
        square,
        squareName: SquareUtil.getSquareName(square)
    });

    export const isTileEmpty = (tile: Tile) =>
        tile.piece?.type === PieceType.Empty;

    export const transferPiece = (oldTile: Tile, newTile: Tile) => {
        oldTile.piece = PieceUtil.empty();
        newTile.piece = oldTile.piece;
    }

};
