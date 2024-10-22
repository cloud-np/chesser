import { PieceComponent } from "../piece/piece.component"
import { PieceUtil } from "../piece/piece.util"
import { SquareComponent } from "../square/square.component"
import { Square } from "../square/square.model"
import { Tile } from "../tile/tile.model"
import { TileUtil } from "../tile/tile.util"
import { BoardState } from "./board.model"

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
        pieceClicked: PieceComponent,
    ) => {

        // UI
        const newSquareIndex = squaresOrder.findIndex(square => newTile.square === square);
        pieceClicked.pieceImg.nativeElement.style.transform = BoardUtil.getTranlationForPos(newSquareIndex, pieceClicked.squareSizeSig());;

        // SDK
        // Nice trick but it flashes the actual element because of re-render
        // setTimeout(() => {
        newTile.piece = oldTile.piece;
        oldTile.piece = PieceUtil.empty();
        // }, 0);
    }

    export const getTranlationForPos = (piecePos: number, squareSize: number): string => {
        const offsets = BoardUtil.getCoordsBasedOnSquare(piecePos).map(axis => axis * squareSize);
        return `translate(${offsets[0]}px, ${offsets[1]}px)`;
    }
}
