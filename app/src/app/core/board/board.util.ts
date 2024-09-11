import { Square } from "../square/square.model"
import { TileUtil } from "../tile/tile.util"

export namespace BoardUtil {
    export const getRowBasedOnSquare = (square: Square) =>
        Math.floor(square / 8)

    export const getColBasedOnSquare = (square: Square) =>
        square % 8

    export const getCoordsBasedOnSquare = (square: Square) =>
        [getColBasedOnSquare(square), getRowBasedOnSquare(square)]

    export const generateTiles = (whiteView: boolean = true) => {
        return [...Array(64)].map((_, offset) => {
            const sq = whiteView ? offset : 63 - offset;
            let changeRowStartingColor = BoardUtil.getRowBasedOnSquare(sq) % 2 === 0
                ? 0 : 1;
            return TileUtil.createTile((sq + changeRowStartingColor) % 2 === 0, sq);
        });
    }

    export const getSquareFromRankAndFile = (rank: number, file: number) =>
        rank * 8 + file
}
