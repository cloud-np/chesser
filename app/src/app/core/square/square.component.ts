import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal, SimpleChanges } from '@angular/core';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { Piece, PieceType } from '../piece/piece.model';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { BoardUtil } from '../board/board.util';
import { Square } from './square.model';

@Component({
    selector: 'app-square',
    templateUrl: './square.component.html',
    standalone: true,
    imports: [NgStyle, NgClass, NgIf],
    styleUrls: ['./square.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareComponent {
    private boardUiService: BoardUiService = inject(BoardUiService);
    squareClicked = output<Square>();
    wasSquareSelected = false;
    piece = input.required<Piece>();
    isWhite = input.required<boolean>();
    squarePos = input.required<number>();
    square = input.required<Square>();

    PieceType = PieceType;
    imgSrcSig = computed(() => `../../assets/pieces/${this.piece()?.imgName}`);
    colorSig = computed(() => this.isWhite() ? 'white' : 'black');
    // No need to floor or ceil the provided size should always be a perfectly divied by 8.
    squareSizeSig = computed(() => this.boardUiService.getBoardSize() / 8);
    squarePosSig = computed(() => {
        const offsets = BoardUtil.getCoordsBasedOnSquare(this.squarePos()).map(axis => axis * this.squareSizeSig());
        return `translate(${offsets[0]}px, ${offsets[1]}px)`;
    });

    onTileClicked() {
        // this.wasSquareSelected = true;
        this.squareClicked.emit(this.square());
    }
}
