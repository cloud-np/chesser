import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, OnInit, QueryList, signal, Signal, ViewChildren, ViewEncapsulation } from '@angular/core';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { BoardStore } from 'src/app/store/board/board.store';
import { Tile } from '../tile/tile.model';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SquareComponent } from '../square/square.component';
import { TileUtil } from '../tile/tile.util';
import { CoordsComponent } from './coords/coords.component';
import { PieceUtil } from '../piece/piece.util';
import { Move } from '../move/move.model';
import { Square } from '../square/square.model';

@Component({
    selector: 'app-board',
    templateUrl: './board.container.html',
    standalone: true,
    providers: [BoardStore],
    imports: [NgClass, NgFor, FormsModule, NgStyle, SquareComponent, CoordsComponent],
    styleUrls: ['./board.container.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class BoardContainer {
    private boardUiService: BoardUiService = inject(BoardUiService);
    readonly store = inject(BoardStore);
    boardTiles = computed(() => this.store.tiles());
    allClickedSquares: Square[] = [];
    allMoves: Move[] = [];
    // Used to track the move that its happening rightn now
    firstClickedSquareForMove = signal<Square | undefined>(undefined);

    @ViewChildren(SquareComponent) squares!: QueryList<SquareComponent>;

    rows: number[] = Array.from({ length: 8 }, (_, i) => i);
    boardSizeSig = computed(() => this.boardUiService.getBoardSize());
    userFen: string = '';
    boardTilesSig: Signal<Tile[]> = computed(() => {
        // Having this singal here forces boardTilesSig to be re-computed
        // We need something better.
        this.firstClickedSquareForMove();
        const tiles = this.boardTiles();
        return this.store.boardSquareOrder().map(sq => ({ ...tiles[sq] }));
    });

    // ngAfterViewInit(): void {
    //     const tiles = this.boardTiles();
    //     if (this.squares)
    //         this.squares.forEach(squareComponent => squareComponent.piece.set(tiles[squareComponent.square()].piece))
    // }

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

    squareClicked(clickedSquare: Square) {
        this.allClickedSquares.push(clickedSquare);
        const firstClickedSquare = this.firstClickedSquareForMove();

        // We have square 0
        if (firstClickedSquare !== undefined) {
            const tiles = this.boardTiles();
            const firstTile = tiles[firstClickedSquare];
            if (!TileUtil.isTileEmpty(firstTile)) {
                TileUtil.transferPiece(firstTile, tiles[clickedSquare]);
                this.firstClickedSquareForMove.set(undefined);
                return;
            }
        }
        this.firstClickedSquareForMove.set(clickedSquare);
    }
}
