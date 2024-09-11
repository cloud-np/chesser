import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { Tile } from '../tile/tile.model';
import { PieceType } from '../piece/piece.model';
import { NgClass, NgIf, NgStyle } from '@angular/common';

@Component({
    selector: 'app-square',
    templateUrl: './square.component.html',
    standalone: true,
    imports: [NgStyle, NgClass, NgIf],
    styleUrls: ['./square.component.scss'],
    host: {
        '[class.clicked]': 'wasSquareClicked'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareComponent {
    private boardUiService: BoardUiService = inject(BoardUiService);

    squareClicked = output<Tile>();

    wasSquareClicked = false;
    tileSig = input.required<Tile>();

    PieceType = PieceType;
    imgSrcSig = computed(() => `../../assets/pieces/${this.tileSig()?.piece?.imgName}`);
    colorSig = computed(() => this.tileSig()?.isWhite ? 'white' : 'black');
    squareSizeSig = computed(() => Math.floor(this.boardUiService.getBoardSize() / 8));
    squarePosSig = computed(() => {
        const offsets = this.tileSig().coords.map(axis => axis * this.squareSizeSig());
        return `translate(${offsets[0]}px, ${offsets[1]}px)`;
    });

    // TODO: Fix this its terrible.
    onTileClicked() {
        this.wasSquareClicked = true;
        console.log("oiui ", this.tileSig());
        this.squareClicked.emit(this.tileSig());
    }
}
