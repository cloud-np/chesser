import { Square } from "./square.model";

export namespace SquareUtil {

    export const getSquareName = (s: Square): string  => {
        return String.fromCharCode('a'.charCodeAt(0) + s % 8) +
            String.fromCharCode('1'.charCodeAt(0) + Math.floor(s / 8));
    }

    export const getSquareFromRankAndFile = (rank: number, file: number): Square =>
        rank * 8 + file

    export const getSwappedSquare = () => {

    }
}
