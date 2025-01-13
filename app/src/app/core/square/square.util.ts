import { Pos, Square } from "../types";

export namespace SquareUtil {

    export const getSwappedSquare = () => {

    }

    export const posToSquare = ([x, y]: [number, number]): Square => {
        const file = String.fromCharCode('a'.charCodeAt(0) + x);
        const rank = 8 - y;

        return `${file}${rank}` as Square;
    }

    export const squareToPos = (square: Square): Pos => {
        // Split the square into file (letter) and rank (number)
        const file = square[0];
        const rank = parseInt(square[1]);

        // Convert file letter to number (a=0, b=1, etc.)
        const x = file.charCodeAt(0) - 'a'.charCodeAt(0);

        // Convert rank to zero-based index from bottom
        // Subtract from 7 because chess ranks go from bottom to top
        const y = 8 - rank;

        return [x, y];
    }
}
