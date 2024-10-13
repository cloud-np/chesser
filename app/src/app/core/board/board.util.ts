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

    export const generateTiles = (isWhiteView = true) => {
        const tiles: Tile[] = [];

        const genTile = (rank: number, file: number): void => {
            const sq = SquareUtil.getSquareFromRankAndFile(rank, file);
            const changeRowStartingColor = BoardUtil.getRowBasedOnSquare(sq) % 2;
            tiles.push(
                TileUtil.createTile((sq + changeRowStartingColor) % 2 === 0, sq)
            );
        }

        if (isWhiteView) {
            for (let rank = 8; rank > 0; rank--) {
                for (let file = 8; file > 0; file--) {
                    genTile(rank, -file);
                }
            }
            return tiles;
        }

        for (let rank = 0; rank < 8; rank++) {
            for (let file = 7; file >= 0; --file) {
                genTile(rank, file);
            }
        }
        return tiles;
    }
}
