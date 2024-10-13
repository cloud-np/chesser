import { Injectable, signal } from '@angular/core';
import { Move } from '../core/move/move.model';
import { Tile } from '../core/tile/tile.model';
import { DEFAULT_BOARD_SIZE, MAX_BOARD_SIZE, MIN_BOARD_SIZE } from '../core/board/board.const';

@Injectable({
    providedIn: 'root'
})
export class BoardUiService {

    // TODO: this should be coming from the store maybe
    private boardSizeSig = signal<number>(DEFAULT_BOARD_SIZE);
    private pickedTileWithPieceSig = signal<Tile | undefined>(undefined);
    private lastMoveSig = signal<Move | undefined>(undefined);

    getLastMove(): Move | undefined {
        return this.lastMoveSig();
    }

    setLastMove(move: Move | undefined): void {
        this.lastMoveSig.set(move);
    }

    getPickedTileWithPiece(): Tile | undefined {
        return this.pickedTileWithPieceSig();
    }

    setPickedTileWithPiece(pickedTile: Tile | undefined): void {
        this.pickedTileWithPieceSig.set(pickedTile);
    }

    getBoardSize(): number {
        return this.boardSizeSig();
    }

    addBoardSize(addSize: number): void {
        this.boardSizeSig.update(boardSize => {
            const posNonDividableSize = boardSize + addSize;
            if (posNonDividableSize >= MAX_BOARD_SIZE) return boardSize;

            // Unsure that the new size is always perfectly dividable by 8
            // makes the rest of resizing much easier.
            return posNonDividableSize + (posNonDividableSize % 8);
        });
    }

    removeBoardSize(addSize: number): void {
        this.boardSizeSig.update(boardSize => {
            const posNonDividableSize = boardSize - addSize;
            if (posNonDividableSize <= MIN_BOARD_SIZE) return boardSize;

            return posNonDividableSize + (posNonDividableSize % 8);
       });
    }

}
