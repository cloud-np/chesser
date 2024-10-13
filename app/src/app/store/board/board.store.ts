import { fenTranslator } from "src/app/utils/fen.util";
import { BoardState } from "../../core/board/board.model";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { DEFAULT_BOARD_SIZE, DEFAULT_FEN } from "src/app/core/board/board.const";
import { Move } from "src/app/core/move/move.model";
import { Signal } from "@angular/core";


export const initialBoardState: BoardState = {
    ...fenTranslator(DEFAULT_FEN),
    boardSize: DEFAULT_BOARD_SIZE,
    isWhiteView: true
};

export const BoardStore = signalStore(
    withState(initialBoardState),
    withComputed(({ }) => ({
    })),
    withMethods((store) => ({
        setFen(fen: string, isWhiteView = true) {
            patchState(store, (state) => ({ ...fenTranslator(fen, isWhiteView), boardSize: state.boardSize }));
        },
        resetFen() {
            patchState(store, (state) => ({ ...fenTranslator(DEFAULT_FEN, state.isWhiteView), boardSize: state.boardSize }));
        },
        flipBoard() {
            patchState(store, (state) => ({ ...fenTranslator(state.fen, !state.isWhiteView) }));
        },
        setBoardSize(boardSize: number) {
            patchState(store, { boardSize });
        },
        playMove(move: Move) {
            patchState(store, (state) => ({ moves: { ...state.moves, move } }));
        }
    }))
);
