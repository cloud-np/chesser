import { createReducer, on } from "@ngrx/store";
import { fenTranslator } from "src/app/utils/fen.util";
import { BoardState } from "../../boardState";
import { BoardAction } from "./board.actions";


export const initialBoardState: BoardState = fenTranslator('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');

export const boardReducer = createReducer(
    initialBoardState,
    on(BoardAction.playerMove, (state, { move }) => {
        const moves = [...state.moves, move];
        return { ...state, moves };
    }),
    // We could keep the old fen later on.
    on(BoardAction.setFen, (_, { fen }) => (fenTranslator(fen))),
);
