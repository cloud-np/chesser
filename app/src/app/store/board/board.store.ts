import { fenTranslator } from "src/app/utils/fen.util";
import { BoardState } from "../../core/board/board.model";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { DEFAULT_BOARD_SIZE, DEFAULT_FEN } from "src/app/core/board/board.const";
import { Move } from "src/app/core/move/move.model";
import { computed } from "@angular/core";
import { Pos } from "src/app/core/types";
import { BoardUtil } from "src/app/core/board/board.util";
import { SquareUtil } from "src/app/core/square/square.util";


const isWhiteView = false;
export const initialBoardState: BoardState = {
    ...fenTranslator(DEFAULT_FEN),
    boardSize: DEFAULT_BOARD_SIZE,
    isWhiteView,
};

export const BoardStore = signalStore(
    withState(initialBoardState),
    withComputed(({ isWhiteView }) => ({
        // boardSquareOrder: computed(() =>
        //     isWhiteView()
        //         ? LITTLE_ENDIAN_RANK_FILE_MAPPING
        //         : FLIPPED_LITTLE_ENDIAN_RANK_FILE_MAPPING
        // )
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
        // We don't need to pass the piece, since its pos its unique.
        updatePiecePos(oldPos: Pos, pos: Pos) {
            patchState(store, (state) => {
                const square = SquareUtil.posToSquare(oldPos);
                return {
                    pieces: {
                        ...state.pieces,
                        [square]: {
                            ...state.pieces[square],
                            pos
                        }
                    }
                }
            });
        },
        // playMove(move: Move) {
        //     // TODO: update, we don't have tiles anymore
        //     patchState(store, (state) => ({
        //         moves: { ...state.moves, move },
        //         tiles: {
        //             ...state.tiles,
        //             [move.from.square]: move.from,
        //             [move.to.square]: move.to
        //         }
        //     }));
        // }
    }))
);
