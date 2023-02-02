import { createReducer, on } from "@ngrx/store";
import { fenTranslator } from "src/app/utils/fenFunctions";
import { BoardState } from "../../boardState";
import { playerMove, setFen } from "./board.actions";


export const initialBoardState: BoardState = fenTranslator('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');

export const boardReducer = createReducer(
    initialBoardState,
    on(playerMove, (state, { move }) => {
        const moves = [...state.moves, move];
        return { ...state, moves };
    }),
    on(setFen, (_, { fen }) => (fenTranslator(fen))),
);