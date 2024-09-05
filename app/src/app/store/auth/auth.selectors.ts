import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../../core/board/board.model";
import { AppState } from "../app.model";

export const selectAuthState = createSelector(
    (state: AppState) =>  state.auth,
    (state: AuthState) => state,
)
