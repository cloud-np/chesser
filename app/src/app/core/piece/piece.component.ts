import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { Piece } from "./piece.model";

@Component({
    selector: 'app-piece',
    template: `
        <!-- <img class="piece clickable"
            [style.width.px]="squareSizeSig()"
            [style.transform]="piecePosSig()"
            [src]="imgSrcSig()"
        /> -->
    `,
    standalone: true,
    styleUrls: ['./piece.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieceComponent {

    piece = input.required<Piece>();
    coords = input.required<number[]>();

}
