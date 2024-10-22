import { ChangeDetectionStrategy, Component, computed, inject, QueryList, signal, Signal, ViewChildren, ViewEncapsulation } from '@angular/core';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { BoardStore } from 'src/app/store/board/board.store';
import { Tile } from '../tile/tile.model';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SquareComponent } from '../square/square.component';
import { CoordsComponent } from './coords/coords.component';
import { Move } from '../move/move.model';
import { Square } from '../square/square.model';
import { PieceComponent } from '../piece/piece.component';
import { SquareUtil } from '../square/square.util';
import { PieceType, PieceWithSquare } from '../piece/piece.model';
import { BoardUtil } from './board.util';

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
    movingPiece = signal<PieceComponent | undefined>(undefined);

    @ViewChildren(PieceComponent) pieces!: QueryList<PieceComponent>;

    rows: number[] = Array.from({ length: 8 }, (_, i) => i);
    boardSizeSig = computed(() => this.boardUiService.getBoardSize());
    userFen: string = '';
    piecesSig: Signal<PieceWithSquare[]> = computed(() => {
        const pieces = this.store.pieces();
        const order = this.store.boardSquareOrder();
        console.log("om hje");
        return order.reduce((acc, sq, index) => {
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

    pieceClicked(pieceWithClickEvent: { piece: PieceComponent, event: MouseEvent }) {
        const { piece, event } = pieceWithClickEvent;

        // We need to capture the enemy piece
        // if (this.movingPiece()) {
        //     this.squareClicked(event);
        // }

        // We do not want to propagete the event to board container
        // because it will register another event there for the square clicked.
        event.stopPropagation();

        this.movingPiece.set(piece);
    }

    squareClicked(clickEvent: MouseEvent) {
        const movingPiece = this.movingPiece();
        // We have square 0 better be explicit just in case.
        if (movingPiece === undefined) return;

        const clickedPos = this.boardUiService.getSquareFromPixelCoords(clickEvent.offsetX, clickEvent.offsetY);
        const clickedSquare = this.store.boardSquareOrder()[clickedPos];
        const tiles = this.boardTiles();
        const fromSquare = movingPiece.piece().square;
        // If the first tile was empty or the second is the same with the first one
        // then we just return there isn't any atempt for a move.
        if (fromSquare === clickedSquare) return;

        BoardUtil.transferPiece(
            tiles[fromSquare],
            tiles[clickedSquare],
            this.store.boardSquareOrder(),
            movingPiece
        );
        this.movingPiece.set(undefined);
    }
}
