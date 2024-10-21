import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { Piece, PieceType } from '../piece/piece.model';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { BoardUtil } from '../board/board.util';
import { Square } from '../square/square.model';

@Component({
    selector: 'app-piece',
    template: `
        <img class="piece clickable"
            #pieceImg
            [src]="imgSrcSig()"
            [style.transform]="squarePosSig()"
            [style.width.px]="squareSizeSig()"
            [style.height.px]="squareSizeSig()"
        />
    `,
    standalone: true,
    imports: [NgStyle, NgClass, NgIf],
    styleUrls: ['./piece.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieceComponent {
    private boardUiService: BoardUiService = inject(BoardUiService);
    wasSquareSelected = false;
    piece = input.required<Piece>();
    isWhite = input.required<boolean>();
    piecePos = input.required<number>();
    square = input.required<Square>();

    @ViewChild('pieceImg', { static: false }) pieceImg!: ElementRef<HTMLImageElement>;

    PieceType = PieceType;
    imgSrcSig = computed(() => `../../assets/pieces/${this.piece()?.imgName}`);
    colorSig = computed(() => this.isWhite() ? 'white' : 'black');
    // No need to floor or ceil the provided size should always be a perfectly divied by 8.
    squareSizeSig = computed(() => this.boardUiService.getBoardSize() / 8);
    squarePosSig = computed(() => BoardUtil.getTranlationForPos(this.piecePos(), this.squareSizeSig()));
}
