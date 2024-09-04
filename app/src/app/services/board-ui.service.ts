import { Injectable, signal } from '@angular/core';
import { Move } from '../core/move/move.model';
import { Tile } from '../core/tile/tile.model';

const STARTING_BOARD_SIZE = 700;

@Injectable({
    providedIn: 'root'
})
export class BoardUiService {

    private boardSizeSig = signal<number>(STARTING_BOARD_SIZE);
    private pickedTileSig = signal<Tile | undefined>(undefined);
    private lastMoveSig = signal<Move | undefined>(undefined);

    getLastMove(): Move | undefined {
        return this.lastMoveSig();
    }

    setLastMove(move: Move | undefined): void {
        this.lastMoveSig.set(move);
    }

    getPickedTile(): Tile | undefined {
        return this.pickedTileSig();
    }

    setPickedTile(pickedTile: Tile | undefined): void {
        this.pickedTileSig.set(pickedTile);
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
