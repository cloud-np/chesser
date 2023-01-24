import { Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/app/models/move.model';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { Tile } from 'src/app/models/tile.model';

@Component({
  selector: 'app-square',
  template: `
  <div [id]="this.tile?.squareName" class="square" (click)="onTileClicked()" 
       [ngStyle]="squareDims"
       [ngClass]="[color]">
    <span [id]="this.tile?.squareName + 'spanBefore'" class="clicked::before" [ngClass]="tileClickedColor" [ngStyle]="squareDims"></span>

    <img 
      class="piece clickable"
      *ngIf="tile?.piece?.type !== 'empty'"
      [style.width.px]="squareSize"
      [src]="imgSrc"
    />
  </div>
  `,
  styleUrls: ['./square.component.sass']
})
export class SquareComponent implements OnInit {

  @Input() tile: Tile | null = null;

  imgSrc: string = '';
  color: string = '';
  tileClickedColor: string = '';
  squareSize: number = 80;
  lastMove: Move | null = null;
  squareDims = { height: this.squareSize + 'px', width: this.squareSize + 'px' }
  pickedTile: Tile | null = null;

  constructor(private boardUiService: BoardUiService) {
    this.boardUiService.getBoardSize().subscribe((size) => {
      this.squareSize = Math.floor(size / 8);
    });
    this.boardUiService.getPickedTile().subscribe((pickInfo) => {
      this.pickedTile = pickInfo;
    });
    this.boardUiService.getLastMove().subscribe(move => {
      this.lastMove = move;
    });
  }

  onTileClicked() {
    if (this.pickedTile === null) {
      // If the tile is empty, do nothing
      if (this.tile?.piece?.type === 'empty') {
        return;
      }

      this.tileClickedColor = 'clicked';
      if (this.tile?.squareName) {
        let currEl = document.getElementById(this.tile.squareName);
        if (currEl) {
          this.boardUiService.setPickedTile(this.tile);
        }
        console.log('picked piece');
      }
    } else if (this.pickedTile !== null) {
      // Reset the last move's tile colors
      if (this.lastMove !== null) {
        this.lastMove.resetTileColors();
      }

      let move = new Move(this.pickedTile, this.tile!);
      if(move.tryPlayMove()) {
        this.boardUiService.setLastMove(move);
        console.log('clicked second tile');
        this.tileClickedColor = 'clicked';
        this.boardUiService.setPickedTile(null);
      }
    }
  }

  ngOnInit(): void {
    if (this.tile) {
      this.imgSrc = `../../assets/pieces/${this.tile.piece?.imgName}`;
      this.color = this.tile.isWhite ? 'white' : 'not-white'
    }
  }

  ngOnDestory(): void {
    // this.boardUiService.getBoardSize().unsubscribe();
  }

}
