import { AuthState, BoardState } from "../boardState";

export interface AppState {
    board: BoardState;
    auth: AuthState;
}