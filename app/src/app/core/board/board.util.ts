import { Square } from "../square/square.model"
import { TileUtil } from "../tile/tile.util"

export namespace BoardUtil {
    export const getRowBasedOnSquare = (square: Square) =>
        Math.floor(square / 8)

    export const getColBasedOnSquare = (square: Square) =>
        square % 8

    export const getCoordsBasedOnSquare = (square: Square) =>
        [getColBasedOnSquare(square), getRowBasedOnSquare(square)]

    export const generateTiles = () =>
        [...Array(64)].map((_, sq) => {
            let changeRowStartingColor = BoardUtil.getRowBasedOnSquare(sq) % 2 === 0
                ? 0 : 1;
            return TileUtil.createTile((sq + changeRowStartingColor) % 2 === 0, sq);
        });
}
