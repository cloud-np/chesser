import { Tile } from "./core/tile/tile.model";

export interface BoardState {
    fen: string;
    tiles: Tile[];
    deadPieces: string[];
    moves: string[];
}
<<<<<<< HEAD

export interface AuthState {
    token: string;
}

=======
>>>>>>> d58338c (chore: refactor to a functional approach by using pure functions and interfaces instead of classes)
