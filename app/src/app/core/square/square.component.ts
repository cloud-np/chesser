import { Component, computed, inject, input, signal } from '@angular/core';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { Move } from '../move/move.model';
import { MoveUtil } from '../move/move.util';
import { Tile } from '../tile/tile.model';
import { PieceType } from '../piece/piece.model';
import { NgClass, NgIf, NgStyle } from '@angular/common';

@Component({
    selector: 'app-square',
    templateUrl: './square.component.html',
    standalone: true,
    imports: [NgStyle, NgClass, NgIf],
    styleUrls: ['./square.component.scss']
})
export class SquareComponent {
    private boardUiService: BoardUiService = inject(BoardUiService);

    tileSig = input.required<Tile>();
    PieceType = PieceType;
    imgSrcSig = computed(() => `../../assets/pieces/${this.tileSig()?.piece?.imgName}`);
    colorSig = computed(() => this.tileSig()?.isWhite ? 'white' : 'black');
    tileClickedColor: string = '';
    lastMove: Move | undefined = this.boardUiService.getLastMove();
    pickedTile: Tile | undefined = this.boardUiService.getPickedTile();
    squareSizeSig = computed(() => Math.floor(this.boardUiService.getBoardSize() / 8));
    piecePosSig = computed(() => {
        const offsets = this.tileSig().coords.map(axis => axis * this.squareSizeSig());
        return `translate(${offsets[0]}px, ${offsets[1]}px)`;
    });
    wasTileClicked: boolean = false;

    // TODO: Fix this its terrible.
    onTileClicked() {
        const tile = this.tileSig();
        if (!tile) {
            return;
        }

        if (!this.pickedTile) {
            // If the tile is empty, do nothing
            if (tile.piece?.type === PieceType.Empty) {
               return;
            }

            this.tileClickedColor = 'clicked';
            let currEl = document.getElementById(tile.squareName);
            if (currEl) {
                this.boardUiService.setPickedTile(this.tileSig());
            }
            console.log('picked piece');
            return;
        }

        // Reset the last move's tile colors
        if (this.lastMove) {
            MoveUtil.resetTileColors(this.lastMove);
        }

        let move = {
            from: this.pickedTile,
            to: tile
        };

        if (MoveUtil.tryPlayMove(move)) {
            this.boardUiService.setLastMove(move);
            console.log('clicked second tile');
            this.tileClickedColor = 'clicked';
            this.boardUiService.setPickedTile(undefined);
        }
    }
}
