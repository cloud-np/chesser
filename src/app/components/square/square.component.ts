import { Component, Input, OnInit } from '@angular/core';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { Tile } from 'src/app/tile.model';

@Component({
  selector: 'app-square',
  template: `
  <div class="square" (click)="handleClick($event)" 
    (pieceClicked)="onPieceClicked($event)"
    [ngStyle]="{'height': squareSize + 'px', 'width': squareSize + 'px'}" [ngClass]="tile?.isWhite ? 'white' : 'not-white'">
    <app-piece [squareSize]="squareSize" [piece]="tile?.piece"></app-piece>
  </div>
  `,
  // <img cdkDragBoundary=".board" cdkDrag class="non-empty" *ngIf="tile?.piece?.type !== 'empty'" [style.width.px]="squareSize" [src]="imgSrc"/>
  styleUrls: ['./square.component.sass']
})
export class SquareComponent implements OnInit {

  @Input() tile: Tile | null = null;

  imgSrc: string = ``;
  squareSize: number = 80;

  constructor(private boardUiService: BoardUiService) {
    this.boardUiService.getBoardSize().subscribe((size) => {
      this.squareSize = Math.floor(size / 8);
    });
  }

  onPieceClicked(event: any){
    console.log("piece clicked", event);
  }

  handleClick(event: any){
    event.target.innerHTML += "clicked";
  }

  ngOnInit(): void {
    this.imgSrc = `../../assets/pieces/${this.tile?.piece?.imgName}`;
  }

  ngOnDestory(): void {
    // this.boardUiService.getBoardSize().unsubscribe();
  }

}
