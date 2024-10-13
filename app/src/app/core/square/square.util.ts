import { QueryList } from "@angular/core";
import { TileUtil } from "../tile/tile.util";
import { SquareComponent } from "./square.component";
import { Tile } from "../tile/tile.model";
import { Square } from "./square.model";

export namespace SquareUtil {

    export const getSquareForClickedTile = (squares: QueryList<SquareComponent>, tile: Tile): SquareComponent | undefined => {
        // If the tile is empty, do nothing
        if (TileUtil.isTileEmpty(tile)) {
            return undefined;
        }

        // this.tileClickedColor = 'clicked';
        // let currEl = document.getElementById(tile.squareName);
        // const currSquare =
        // if (currSquare) {
        //     this.boardUiService.setPickedTileWithPiece(this.tileSig());
        // }
        return squares.find(sq => sq.tileSig().squareName === tile.squareName);
    }

    export const getSquareName = (s: Square): string  => {
        return String.fromCharCode('a'.charCodeAt(0) + s % 8) +
            String.fromCharCode('1'.charCodeAt(0) + Math.floor(s / 8));
    }

    export const getSquareFromRankAndFile = (rank: number, file: number): number =>
        rank * 8 + file

    export const getSwappedSquare = () => {

    }
}
