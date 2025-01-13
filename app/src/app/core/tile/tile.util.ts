import { Tile } from "../tile/tile.model";
import { Square } from "../square/square.model";
import { PieceUtil } from "../piece/piece.util";
import { PieceType } from "../piece/piece.model";

export namespace TileUtil {

    export const createTile = (isWhite: boolean): Tile => ({
        piece: PieceUtil.empty(),
        isWhite
    });

    export const isTileEmpty = (tile: Tile) =>
        tile.piece?.type === PieceType.Empty;

    export const transferPiece = (oldTile: Tile, newTile: Tile) => {
        newTile.piece = oldTile.piece;
        oldTile.piece = PieceUtil.empty();
    }

};
