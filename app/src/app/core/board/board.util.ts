import { Pos } from "../types"

export namespace BoardUtil {
    // export const generateTiles = (): Tile[] => (
    //     [...Array(64)].map(sq => {
    //         const changeRowStartingColor = BoardUtil.getRowBasedOnSquare(sq) % 2 === 0 ? 1 : 0;
    //         return TileUtil.createTile((sq + changeRowStartingColor) % 2 === 0);
    //     })
    // );


    // export const transferPiece = (
    //     oldTile: Tile,
    //     newTile: Tile,
    //     squaresOrder: Square[],
    //     pieceClicked: PieceComponent,
    // ) => {
    //
    //     // UI
    //     const newSquareIndex = squaresOrder.findIndex(square => newTile.piece.square === square);
    //     pieceClicked.pieceImg.nativeElement.style.transform = BoardUtil.getTranlationForPos(newSquareIndex, pieceClicked.squareSizeSig());
    //
    //     // SDK
    //     // Nice trick but it flashes the actual element because of re-render
    //     // setTimeout(() => {
    //     newTile.piece = oldTile.piece;
    //     oldTile.piece = PieceUtil.empty();
    //     // }, 0);
    // }

    export const getTranlationForPos = (piecePos: Pos, squareSize: number): string => {
        const offsets = piecePos.map(axis => axis * squareSize);
        return `translate(${offsets[0]}px, ${offsets[1]}px)`;
    }
}
