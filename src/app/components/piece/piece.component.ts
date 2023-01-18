import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Piece } from 'src/app/piece.model';

@Component({
  selector: 'app-piece',
  // templateUrl: './piece.component.html',
  template: `
    <img (click)="handleClick($event)" class="piece" class="non-empty" *ngIf="piece?.type !== 'empty'" [style.width.px]="squareSize" [src]="imgSrc"/>
  `,
  styleUrls: ['./piece.component.sass']
})
export class PieceComponent implements OnInit {

  @Input() piece?: Piece;
  @Input() squareSize?: number;
  @Output() pieceClicked = new EventEmitter();
  imgSrc: string = ``;

  ngOnInit(): void {
    this.imgSrc = `../../assets/pieces/${this.piece?.imgName}`;
  }

  handleClick(event: any){
    // console.log("clicked", event)
    this.pieceClicked.emit(event);
  }
}
