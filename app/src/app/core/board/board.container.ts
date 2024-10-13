import { ChangeDetectionStrategy, Component, computed, inject, QueryList, signal, Signal, ViewChildren, ViewEncapsulation } from '@angular/core';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { BoardStore } from 'src/app/store/board/board.store';
import { Tile } from '../tile/tile.model';
import { NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SquareComponent } from '../square/square.component';
import { Move } from '../move/move.model';
import { MoveUtil } from '../move/move.util';
import { TileUtil } from '../tile/tile.util';
import { CoordsComponent } from './coords/coords.component';

@Component({
    selector: 'app-board',
    templateUrl: './board.container.html',
    standalone: true,
    providers: [BoardStore],
    imports: [NgClass, FormsModule, NgStyle, SquareComponent, CoordsComponent],
    styleUrls: ['./board.container.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class BoardContainer {
    private boardUiService: BoardUiService = inject(BoardUiService);
    readonly store = inject(BoardStore);

    @ViewChildren(SquareComponent) squares!: QueryList<SquareComponent>;

    rows: number[] = Array.from({ length: 8 }, (_, i) => i);
    boardSizeSig = computed(() => this.boardUiService.getBoardSize());
    userFen: string = '';
    boardTilesSig: Signal<Tile[]> = this.store.tiles;
    isWhiteView = signal(true);
    lastMove: Move | undefined = this.boardUiService.getLastMove();
    pickedTileWithPiece: Tile | undefined = this.boardUiService.getPickedTileWithPiece();

    addBoardSize(): void {
        this.boardUiService.addBoardSize(100);
    }

    removeBoardSize(): void {
        this.boardUiService.removeBoardSize(100);
    }

    setFen(): void {
        this.store.setFen(this.userFen);
    }

    resetFen(): void {
        this.store.resetFen();
    }

    flipBoard(): void {
        this.store.flipBoard();
    }

    squareClicked(clickedTile: Tile) {
        if (!this.pickedTileWithPiece) {
            // If the tile is empty, do nothing
            if (TileUtil.isTileEmpty(clickedTile)) {
                return;
            }

            // const currSquare = this.squares.find(sq => sq.tileSig().squareName === clickedTile.squareName);
            // This should always be present its more of a sanity check.
            // if (!currSquare) {
            //     return;
            // }

            this.boardUiService.setPickedTileWithPiece(clickedTile);
            // Fix this
            // currSquare.wasTileClicked = true;


            // this.tileClickedColor = 'clicked';
            // console.log('picked piece');
            return;
        }
        // 1) Should update picked piece?

        // Reset the last move's tile colors
        if (this.lastMove) {
            MoveUtil.resetTileColors(this.lastMove);
        }

        let move = {
            from: this.pickedTileWithPiece,
            to: clickedTile
        };

        if (MoveUtil.tryPlayMove(move)) {
            this.boardUiService.setLastMove(move);
            console.log('clicked second tile');
            // this.tileClickedColor = 'clicked';
            this.boardUiService.setPickedTileWithPiece(undefined);
        }
    }
}
