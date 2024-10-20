import { PieceComponent } from "../piece/piece.component"
import { SquareComponent } from "../square/square.component"
import { Square } from "../square/square.model"
import { Tile } from "../tile/tile.model"
import { TileUtil } from "../tile/tile.util"

export namespace BoardUtil {
    export const getRowBasedOnSquare = (square: Square) =>
        Math.floor(square / 8)

    export const getColBasedOnSquare = (square: Square) =>
        square % 8

    export const getCoordsBasedOnSquare = (square: Square) =>
        [getColBasedOnSquare(square), getRowBasedOnSquare(square)]

    export const getSquareFromPixelCoords = (x: number, y: number, boardSize: number): Square => {
        const squareSize = boardSize / 8;
        const col = Math.floor(x / squareSize);
        const row = Math.floor(y / squareSize);
        return (row * 8) + col;
    };

    export const generateTiles = (): Record<Square, Tile> => (
        [...Array(64)].reduce((acc, _, sq) => {
            const changeRowStartingColor = BoardUtil.getRowBasedOnSquare(sq) % 2 === 0 ? 1 : 0;
            acc[sq] = TileUtil.createTile((sq + changeRowStartingColor) % 2 === 0, sq);
            return acc;
        }, {} as Record<Square, Tile>)
    );


    export const transferPiece = (
        oldTile: Tile,
        newTile: Tile,
        squaresOrder: Square[],
        pieceClicked: PieceComponent
    ) => {
        const oldSquareIndex = squaresOrder.findIndex(square => oldTile.square === square);
        const newSquareIndex = squaresOrder.findIndex(square => newTile.square === square);

        const getTranlate = (piecePos: number) => {
            const sp = piecePos;
            const ss = pieceClicked.squareSizeSig();
            const offsets = BoardUtil.getCoordsBasedOnSquare(sp).map(axis => axis * ss);
            return [offsets[0], offsets[1]];
        }
        const oldTileOffset = getTranlate(oldSquareIndex);
        const newTileOffset = getTranlate(newSquareIndex);
        const finalTranlate = `translate(${newTileOffset[0] - oldTileOffset[0]}px, ${newTileOffset[1] - oldTileOffset[1]}px)`;
        console.log(oldTileOffset, newTileOffset);

        pieceClicked.pieceImage!.nativeElement.style.transform = finalTranlate;
        // newTile.tile.piece = oldTile.tile.piece;
        // oldTile.tile.piece = PieceUtil.empty();
    }
}
