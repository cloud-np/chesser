import { fenTranslator } from "src/app/utils/fen.util";
import { BoardState } from "../../core/board/board.model";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { DEFAULT_BOARD_SIZE, DEFAULT_FEN } from "src/app/core/board/board.const";
import { Move } from "src/app/core/move/move.model";


export const initialBoardState: BoardState = {
    ...fenTranslator(DEFAULT_FEN),
    boardSize: DEFAULT_BOARD_SIZE
};

export const BoardStore = signalStore(
    withState(initialBoardState),
    withComputed(({}) => ({

    })),
    withMethods((store) => ({
        setFen(fen: string) {
            patchState(store, (state) => ({ ...fenTranslator(fen), boardSize: state.boardSize }));
        },
        resetFen() {
            patchState(store, (state) => ({ ...fenTranslator(DEFAULT_FEN), boardSize: state.boardSize }));
        },
        setBoardSize(boardSize: number) {
            patchState(store, { boardSize });
        },
        playMove(move: Move) {
            patchState(store, (state) => ({ moves: { ...state.moves, move } }));
        }
    }))
);
