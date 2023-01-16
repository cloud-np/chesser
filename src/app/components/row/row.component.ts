import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.sass']
})
export class RowComponent {
  @Input() changeColor: number = 0;

  squares: number[] = Array.from({ length: 8 }, (_, i) => i);
}
