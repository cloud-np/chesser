import { QueryList } from "@angular/core";
import { TileUtil } from "../tile/tile.util";
import { SquareComponent } from "./square.component";
import { Tile } from "../tile/tile.model";

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
}
