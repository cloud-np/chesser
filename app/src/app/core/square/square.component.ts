import { ChangeDetectionStrategy, Component, computed, inject, input, output, SimpleChanges } from '@angular/core';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { Tile } from '../tile/tile.model';
import { PieceType } from '../piece/piece.model';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { SquareUtil } from './square.util';
import { BoardUtil } from '../board/board.util';

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
    squareClicked = output<Tile>();
    wasSquareSelected = false;
    tileSig = input.required<Tile>();

    PieceType = PieceType;
    imgSrcSig = computed(() => `../../assets/pieces/${this.tileSig()?.piece?.imgName}`);
    colorSig = computed(() => this.tileSig()?.isWhite ? 'white' : 'black');
    // No need to floor or ceil the provided size should always be a perfectly divied by 8.
    squareSizeSig = computed(() => this.boardUiService.getBoardSize() / 8);
    squarePosSig = computed(() => {
        const offsets = BoardUtil.getCoordsBasedOnSquare(this.tileSig().square).map(axis => axis * this.squareSizeSig());
        return `translate(${offsets[0]}px, ${offsets[1]}px)`;
    });

    ngOnChanges(changes: SimpleChanges): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        
        console.log("ep: ", changes['tileSig'].currentValue.squareName);
    }

    // TODO: Fix this its terrible.
    // If you do not put the empty Squares somehow with width/height this will miss them
    onTileClicked() {
        this.wasSquareSelected = true;
        console.log(this.tileSig().squareName);
        this.squareClicked.emit(this.tileSig());
    }
}
