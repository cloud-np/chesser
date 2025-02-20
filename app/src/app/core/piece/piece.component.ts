import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { BoardUtil } from '../board/board.util';
import { Piece } from "../types";

@Component({
    selector: 'app-piece',
    template: `
        <img class="piece clickable"
            #pieceImg
            [src]="imgSrcSig()"
            [style.transform]="squarePosSig()"
            [style.width.px]="squareSizeSig()"
            [style.height.px]="squareSizeSig()"
            (click)="emitPieceClicked($event)"
        />
    `,
    standalone: true,
    styleUrls: ['./piece.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieceComponent {
    private boardUiService: BoardUiService = inject(BoardUiService);
    wasSquareSelected = false;

    // TODO: You pass the Square but you never update it!! ???
    // Why do you even pass it here.
    piece = input.required<Piece>();
    isWhite = input.required<boolean>();
    pieceClicked = output<{ piece: Piece, event: MouseEvent }>();

    @ViewChild('pieceImg', { static: false }) pieceImg!: ElementRef<HTMLImageElement>;

    imgSrcSig = computed(() => `../../assets/pieces/${this.piece()?.imgName}`);
    colorSig = computed(() => this.isWhite() ? 'white' : 'black');
    // No need to floor or ceil the provided size should always be a perfectly divided by 8.
    squareSizeSig = computed(() => this.boardUiService.getBoardSize() / 8);
    squarePosSig = computed(() => {
        return BoardUtil.getTranlationForPos(this.piece().pos, this.squareSizeSig());
    });

    emitPieceClicked(event: MouseEvent): void {
        this.pieceClicked.emit({ piece: this.piece(), event: event });
    }
}
