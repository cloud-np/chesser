import { fenDecoder } from "src/app/utils/fen.util";
import { BoardState } from "../../core/board/board.model";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { DEFAULT_BOARD_SIZE, DEFAULT_FEN } from "src/app/core/board/board.const";
import { Piece, Pos, Square } from "src/app/core/types";
import { SquareUtil } from "src/app/core/square/square.util";


const isWhiteView = true;
export const initialBoardState: BoardState = {
    ...fenDecoder(DEFAULT_FEN),
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
        flipBoard() {
            patchState(store, (state) => ({ isWhiteView: !state.isWhiteView, ...fenDecoder(state.fen, !state.isWhiteView) }));
        },
        setBoardSize(boardSize: number) {
            patchState(store, { boardSize });
        },
        setFen(fen: string) {
            patchState(store, (state) => ({ ...fenDecoder(fen) }));
        },
        resetFen() {
            patchState(store, (state) => ({ ...initialBoardState }));
        },
        updatePiecePos(oldPos: Pos, pos: Pos) {
            patchState(store, (state) => {
                const oldSquare = SquareUtil.posToSquare(oldPos);
                const newSquare = SquareUtil.posToSquare(pos)
                const piece = state.pieces.find(p => p.square === oldSquare);
                piece!.posSig.set(pos);
                piece!.square = newSquare;
                return state;
            });
        },
        pieceCaptured(movingPiece: Piece, piece: Piece) {
            patchState(store, (state) => {
                const newSquare = piece.square;
                const newPos = piece.posSig();
                const pieces = state.pieces.filter(p => p.square !== newSquare)
                movingPiece.square = newSquare;
                movingPiece.posSig.set(newPos);
                return {
                    ...state,
                    pieces
                };
            });
            // this.deadPieces.push(piece);
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

// @Injectable({ providedIn: 'root' })
// export class BoardStore {
//     state: BoardState = initialBoardState;

//     updatePiecePos(oldPos: Pos, pos: Pos) {
//         const oldSquare = SquareUtil.posToSquare(oldPos);
//         const newSquare = SquareUtil.posToSquare(pos);

//         const piece = this.state.piecesSig().find(p => p.square === oldSquare);
//         if (piece) {
//             piece.posSig.set(pos);
//             piece.square = newSquare;
//         }
//     }

//     pieceCaptured(movingPiece: Piece, piece: Piece) {
//         const newSquare = piece.square;
//         const newPos = piece.posSig();
//         this.state.pieces.update(pieces => pieces.filter(p => p.square !== newSquare));
//         movingPiece.square = newSquare;
//         movingPiece.posSig.set(newPos);

//         // this.deadPieces.push(piece);
//     }

//     get pieces(): Piece[] {
//         return this.state.piecesSig();
//     }
//     set pieces(pieces) {
//         this.state.piecesSig.set(pieces);
//     }

//     get deadPieces(): string[] {
//         return this.state.deadPieces;
//     }
//     set deadPieces(deadPieces: string[]) {
//         this.state.deadPieces = deadPieces;
//     }

//     get moves(): string[] {
//         return this.state.moves;
//     }
//     set moves(moves: string[]) {
//         this.state.moves = moves;
//     }

//     get boardSize(): number {
//         return this.state.boardSize;
//     }
//     set boardSize(boardSize: number) {
//         this.state.boardSize = boardSize;
//     }

//     get isWhiteView(): boolean {
//         return this.state.isWhiteView;
//     }
//     set isWhiteView(isWhiteView: boolean) {
//         this.state.isWhiteView = isWhiteView;
//     }
// };
