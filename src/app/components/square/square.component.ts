import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  // templateUrl: './square.component.html',
  template: `<div class="square" [ngClass]="isWhite ? 'white' : 'not-white'"></div>`,
  styleUrls: ['./square.component.sass']
})
export class SquareComponent {

  @Input() isWhite: boolean = false;

}
