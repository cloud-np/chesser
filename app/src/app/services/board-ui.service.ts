import { Injectable, signal } from '@angular/core';
import { Move } from '../core/move/move.model';
import { Tile } from '../core/tile/tile.model';
import { DEFAULT_BOARD_SIZE } from '../core/board/board.const';

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
        this.boardSizeSig.update(currBoardSize => currBoardSize + addSize);
    }

    removeBoardSize(addSize: number): void {
        this.boardSizeSig.update(currBoardSize => currBoardSize - addSize);
    }

}
