import { Component, computed, inject, Input, input, output, signal } from '@angular/core';
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

    tileClicked = output<Tile>();

    @Input() wasTileClicked = false;
    tileSig = input.required<Tile>();

    PieceType = PieceType;
    imgSrcSig = computed(() => `../../assets/pieces/${this.tileSig()?.piece?.imgName}`);
    colorSig = computed(() => this.tileSig()?.isWhite ? 'white' : 'black');
    squareSizeSig = computed(() => Math.floor(this.boardUiService.getBoardSize() / 8));
    piecePosSig = computed(() => {
        const offsets = this.tileSig().coords.map(axis => axis * this.squareSizeSig());
        return `translate(${offsets[0]}px, ${offsets[1]}px)`;
    });

    // TODO: Fix this its terrible.
    onTileClicked() {
        this.tileClicked.emit(this.tileSig());
    }
}
