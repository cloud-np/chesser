import { BoardState } from "../core/board/board.model";
import { AuthState } from "./auth/auth.model";

export interface AppState {
    board: BoardState;
    auth: AuthState;
}
