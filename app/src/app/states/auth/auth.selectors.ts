import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../../boardState";
import { AppState } from "../app.state";

export const selectAuthState = createSelector(
    (state: AppState) =>  state.auth,
    (state: AuthState) => state,
)