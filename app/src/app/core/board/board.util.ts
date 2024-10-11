import { Square } from "../square/square.model"
import { SquareUtil } from "../square/square.util"
import { TileUtil } from "../tile/tile.util"

export namespace BoardUtil {
    export const getRowBasedOnSquare = (square: Square) =>
        Math.floor(square / 8)

    export const getColBasedOnSquare = (square: Square) =>
        square % 8

    export const getCoordsBasedOnSquare = (square: Square) =>
        [getColBasedOnSquare(square), getRowBasedOnSquare(square)]

    export const generateTiles = () => {
        const ep = [];
        for (let i = 8; i > 0; --i) {
            for (let j = 8; j > 0; --j) {
                const sq = SquareUtil.getSquareFromRankAndFile(i, -j);
                const changeRowStartingColor = BoardUtil.getRowBasedOnSquare(sq) % 2;
                ep.push(
                    TileUtil.createTile((sq + changeRowStartingColor) % 2 === 0, sq)
                );
            }
        }
        return ep;
    }
    // [...Array(64)].map((_, s) => {
    //     const count = s % 8;
    //     const sq = 63 - s;
    //     console.log(sq);
    //     const changeRowStartingColor = BoardUtil.getRowBasedOnSquare(sq) % 2;
    //     return TileUtil.createTile((sq + changeRowStartingColor) % 2 === 0, sq);
    // });
}
