import { Component, inject, NgModule, Signal } from '@angular/core';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { BoardStore } from 'src/app/store/board/board.store';
import { Tile } from '../tile/tile.model';
import { NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SquareComponent } from '../square/square.component';

@Component({
    selector: 'app-board',
    templateUrl: './board.container.html',
    standalone: true,
    providers: [BoardStore],
    imports: [NgClass, FormsModule, NgStyle, SquareComponent],
    styleUrls: ['./board.container.scss'],
})
export class BoardContainer {
    private boardUiService: BoardUiService = inject(BoardUiService);
    private store = inject(BoardStore);

    rows: number[] = Array.from({ length: 8 }, (_, i) => i);
    boardSize: number = this.boardUiService.getBoardSize();
    userFen: string = '';
    boardTilesSig: Signal<Tile[]> = this.store.tiles;

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
}
