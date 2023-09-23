import { Tile } from "../tile/tile.model";
import { Square } from "../square/square.model";
import { PieceUtil } from "../piece/piece.util";

export namespace TileUtil {

    export const createTile = (isWhite: boolean, square: Square): Tile => {
        const coords = [square % 8, Math.floor(square / 8)];
        return {
            piece: PieceUtil.empty(),
            isWhite: isWhite,
            square: square,
            coords,
            squareName: TileUtil.squareNameFromCoords(coords)
        }
    }

    export const squareNameFromCoords = (coords: number[]): string  => {
        return String.fromCharCode(97 + coords[1]) + (8 - coords[0]);
    }
};
