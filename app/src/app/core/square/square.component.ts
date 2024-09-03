import { Component, Input, OnInit, inject } from '@angular/core';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { map, startWith, tap } from 'rxjs';
import { Move } from '../move/move.model';
import { MoveUtil } from '../move/move.util';
import { Tile } from '../tile/tile.model';
import { PieceType } from '../piece/piece.model';
import { NgClass, NgIf, NgStyle } from '@angular/common';

@Component({
    selector: 'app-square',
    templateUrl: './square.component.html',
    // template: ` `,
    standalone: true,
    imports: [NgStyle, NgClass, NgIf],
    styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

    private boardUiService: BoardUiService = inject(BoardUiService);

    @Input() tile: Tile | undefined;

    imgSrc: string = '';
    color: string = '';
    tileClickedColor: string = '';
    squareSize$ = this.boardUiService.getBoardSize()
        .pipe(
            startWith(640),
            map((bSize: number) => Math.floor(bSize / 8)),
        );
    lastMove: Move | undefined;
    pickedTile: Tile | undefined;
    wasTileClicked: boolean = false;

    constructor() { }

    onTileClicked() {
        if (!this.tile) {
            return;
        }

        if (!this.pickedTile) {
            // If the tile is empty, do nothing
            if (this.tile.piece?.type === PieceType.Empty) {
               return;
            }

            this.tileClickedColor = 'clicked';
            let currEl = document.getElementById(this.tile.squareName);
            if (currEl) {
                this.boardUiService.setPickedTile(this.tile);
            }
            console.log('picked piece');
        } else {
            // Reset the last move's tile colors
            if (this.lastMove) {
                MoveUtil.resetTileColors(this.lastMove);
            }

            let move = {
                from: this.pickedTile,
                to: this.tile
            };

            if (MoveUtil.tryPlayMove(move)) {
                this.boardUiService.setLastMove(move);
                console.log('clicked second tile');
                this.tileClickedColor = 'clicked';
                this.boardUiService.setPickedTile(undefined);
            }
        }
    }

    ngOnInit(): void {
        this.boardUiService.getPickedTile().pipe(
            tap((tile: Tile | undefined) => this.pickedTile = tile),
            // untilDestroyed(this)
        ).subscribe();

        this.boardUiService.getLastMove().pipe(
            tap((move: Move | undefined) => this.lastMove = move),
            // untilDestroyed(this)
        ).subscribe();

        if (this.tile) {
            this.imgSrc = `../../assets/pieces/${this.tile.piece?.imgName}`;
            this.color = this.tile.isWhite ? 'white' : 'not-white'
        }
    }

}
