import { Component, Input } from '@angular/core';
import { Tile } from 'src/app/tile.model';

@Component({
  selector: 'app-row',
  // templateUrl: './row.component.html',
  template: `
  <div class="row" *ngFor="let tile of tiles">
    <app-square [tile]="tile"></app-square>
  <div>`,
  styleUrls: ['./row.component.sass']
})
export class RowComponent {
  @Input() changeColor: number = 0;
  @Input() tiles: Tile[] | null = null;
}
