import { fenTranslator } from "src/app/utils/fen.util";
import { BoardState } from "../../core/board/board.model";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { DEFAULT_BOARD_SIZE, DEFAULT_FEN, FLIPPED_LITTLE_ENDIAN_RANK_FILE_MAPPING, LITTLE_ENDIAN_RANK_FILE_MAPPING } from "src/app/core/board/board.const";
import { Move } from "src/app/core/move/move.model";
import { computed } from "@angular/core";


const isWhiteView = false;
export const initialBoardState: BoardState = {
    ...fenTranslator(DEFAULT_FEN),
    boardSize: DEFAULT_BOARD_SIZE,
    isWhiteView,
    boardSquareOrder:
        isWhiteView
            ? LITTLE_ENDIAN_RANK_FILE_MAPPING
            : FLIPPED_LITTLE_ENDIAN_RANK_FILE_MAPPING
};

export const BoardStore = signalStore(
    withState(initialBoardState),
    withComputed(({ isWhiteView }) => ({
        boardSquareOrder: computed(() =>
            isWhiteView()
                ? LITTLE_ENDIAN_RANK_FILE_MAPPING
                : FLIPPED_LITTLE_ENDIAN_RANK_FILE_MAPPING
        )
    })),
    withMethods((store) => ({
        setFen(fen: string) {
            patchState(store, (state) => ({ ...fenTranslator(fen), boardSize: state.boardSize }));
        },
        resetFen() {
            patchState(store, (state) => ({ ...fenTranslator(DEFAULT_FEN), boardSize: state.boardSize }));
        },
        flipBoard() {
            patchState(store, (state) => ({ isWhiteView: !state.isWhiteView }));
        },
        setBoardSize(boardSize: number) {
            patchState(store, { boardSize });
        },
        playMove(move: Move) {
            patchState(store, (state) => ({ moves: { ...state.moves, move } }));
        }
    }))
);
