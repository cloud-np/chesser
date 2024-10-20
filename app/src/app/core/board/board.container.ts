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
import { BoardUtil } from './board.util';
import { PieceComponent } from '../piece/piece.component';
import { SquareUtil } from '../square/square.util';
import { PieceType } from '../piece/piece.model';

@Component({
    selector: 'app-board',
    templateUrl: './board.container.html',
    standalone: true,
    providers: [BoardStore],
    imports: [NgClass, NgFor, FormsModule, NgStyle, SquareComponent, CoordsComponent, PieceComponent],
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

    PieceType = PieceType;
    // Used to track the move that its happening rightn now
    firstClickedSquareForMove = signal<Square | undefined>(undefined);

    @ViewChildren(PieceComponent) pieces!: QueryList<PieceComponent>;

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
                const secondTile = tiles[clickedSquare];
                const pieceClicked = this.pieces.find(pieceComp => pieceComp.square() === firstClickedSquare);
                // const e = this.pieces.find(pieceComp => pieceComp.square() === clickedSquare);
                if (pieceClicked)
                    BoardUtil.transferPiece(firstTile, secondTile, this.store.boardSquareOrder(), pieceClicked);
                // TODO: Here when trasfering we should basically move the
                // starting piece with transform to the position square.
                // TileUtil.transferPiece(firstTile, );

                this.firstClickedSquareForMove.set(undefined);
                return;
            }
        }
        this.firstClickedSquareForMove.set(clickedSquare);
    }
}
