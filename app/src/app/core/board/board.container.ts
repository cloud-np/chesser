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
import { Piece, PieceType } from '../piece/piece.model';

interface PieceWithSquare extends Piece {
    square: Square;
    piecePos: Square;
    squareName: string;
}

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
    fromSquare = signal<Square | undefined>(undefined);

    @ViewChildren(PieceComponent) pieces!: QueryList<PieceComponent>;

    rows: number[] = Array.from({ length: 8 }, (_, i) => i);
    boardSizeSig = computed(() => this.boardUiService.getBoardSize());
    userFen: string = '';
    piecesSig: Signal<PieceWithSquare[]> = computed(() => {
        // const tiles = this.boardTiles();
        const pieces = this.store.pieces();
        return this.store.boardSquareOrder().reduce((acc, sq, index) => {
            const piece = pieces[sq];
            if (piece) {
                acc.push({ ...pieces[sq], piecePos: index, square: sq, squareName: SquareUtil.getSquareName(sq)});
            }
            return acc;
        }, [] as PieceWithSquare[]);
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
        const fromSquare = this.fromSquare();

        // We have square 0
        if (fromSquare !== undefined) {
            const tiles = this.boardTiles();
            const fromTile = tiles[fromSquare];

            console.log("im here", TileUtil.isTileEmpty(fromTile), fromSquare === clickedSquare)
            // If the first tile was empty or the second is the same with the first one
            // then we just return there isn't any atempt for a move.
            if (!TileUtil.isTileEmpty(fromTile) && fromSquare !== clickedSquare) {
                const toTile = tiles[clickedSquare];
                const pieceClicked = this.pieces.find(pieceComp => pieceComp.square() === fromSquare);
                if (pieceClicked)
                    BoardUtil.transferPiece(fromTile, toTile, this.store.boardSquareOrder(), pieceClicked);
                this.fromSquare.set(undefined);
            }

        }
        this.fromSquare.set(clickedSquare);
    }
}
