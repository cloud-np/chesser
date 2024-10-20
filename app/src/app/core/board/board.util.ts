import { Square } from "../square/square.model"
import { SquareUtil } from "../square/square.util"
import { Tile } from "../tile/tile.model"
import { TileUtil } from "../tile/tile.util"

export namespace BoardUtil {
    export const getRowBasedOnSquare = (square: Square) =>
        Math.floor(square / 8)

    export const getColBasedOnSquare = (square: Square) =>
        square % 8

    export const getCoordsBasedOnSquare = (square: Square) =>
        [getColBasedOnSquare(square), getRowBasedOnSquare(square)]

    export const generateTiles = (): Record<Square, Tile> => (
        [...Array(64)].reduce((acc, _, sq) => {
            const changeRowStartingColor = BoardUtil.getRowBasedOnSquare(sq) % 2 === 0 ? 1 : 0;
            acc[sq] = TileUtil.createTile((sq + changeRowStartingColor) % 2 === 0, sq);
            return acc;
        }, {} as Record<Square, Tile>)
    );
}
