import { Component, OnInit, inject } from '@angular/core';
import { Observable, of, startWith, tap } from 'rxjs';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { Store } from '@ngrx/store';
import { selectBoardState } from 'src/app/states/board/board.selectors';
import { BoardState } from 'src/app/boardState';
import { setFen } from 'src/app/states/board/board.actions';
import { AppState } from 'src/app/states/app.state';

@Component({
  selector: 'app-board',
  // templateUrl: './board.component.html',
  template: `
  <div class="board" [ngStyle]="{'width': (boardSize$ | async) + 'px', 'height': (boardSize$ | async)! + 30 + 'px'}">
      <div class="controlls">
          <button (click)="removeBoardSize()">Down</button>
          <button (click)="addBoardSize()">Up</button>
          <button (click)="resetFen()">Reset Fen</button>
          <input type="text" name="givenFen" [(ngModel)]="givenFen" />
          <button (click)="setFen()">Set Fen</button>
      </div>
      <app-square *ngFor="let tile of (boardState$ | async)?.tiles; let i = index" [tile]="tile" #sq [attr.name]="tile.squareName"></app-square>
  </div>
  `,
  styleUrls: ['./board.component.sass'],
})
export class BoardComponent {

  private boardUiService = inject(BoardUiService);
  private store = inject(Store<AppState>);

  rows: number[] = Array.from({ length: 8 }, (_, i) => i);
  boardSize$ = this.boardUiService.getBoardSize();
  givenFen: string = '';
  boardState$: Observable<BoardState> = this.store.select(selectBoardState);

  addBoardSize(): void {
    this.boardUiService.addBoardSize(100);
  }

  removeBoardSize(): void {
    this.boardUiService.removeBoardSize(100);
  }

  setFen(): void {
    this.store.dispatch(setFen({fen: this.givenFen}));
  }

  resetFen(): void {
    this.store.dispatch(setFen({fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'}));
  }
}
