import { createSelector } from "@ngrx/store";
import { BoardState } from "../../boardState";
import { AppState } from "../app.state";

export const selectBoardState = createSelector(
    (state: AppState) =>  state.board,
    (state: BoardState) => state,
)