<<<<<<< HEAD:app/src/app/components/board/board.component.ts
import { Component, OnInit } from '@angular/core';
=======
import { Component, inject } from '@angular/core';
>>>>>>> d58338c (chore: refactor to a functional approach by using pure functions and interfaces instead of classes):app/src/app/core/board/board.component.ts
import { Observable } from 'rxjs';
import { BoardUiService } from 'src/app/services/board-ui.service';
import { Store } from '@ngrx/store';
import { selectBoardState } from 'src/app/states/board/board.selectors';
import { BoardState } from 'src/app/boardState';
import { setFen } from 'src/app/states/board/board.actions';
import { AppState } from 'src/app/states/app.state';


const DEFAULT_FEN: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
<<<<<<< HEAD:app/src/app/components/board/board.component.ts
  styleUrls: ['./board.component.sass'],
=======
  // template: ``,
  styleUrls: ['./board.component.scss'],
>>>>>>> d58338c (chore: refactor to a functional approach by using pure functions and interfaces instead of classes):app/src/app/core/board/board.component.ts
})
export class BoardComponent implements OnInit {
  rows: number[] = Array.from({ length: 8 }, (_, i) => i);
  boardSize$?: Observable<number>;
  boardSize: number = 640;
  userFen: string = '';
  boardState$: Observable<BoardState> = this.store.select(selectBoardState);

  constructor(private boardUiService: BoardUiService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.boardSize$ = this.boardUiService.getBoardSize();
    this.boardSize$.subscribe((size) => this.boardSize = size);
  }

  addBoardSize(): void {
    this.boardUiService.addBoardSize(100);
  }

  removeBoardSize(): void {
    this.boardUiService.removeBoardSize(100);
  }

  setFen(): void {
    this.store.dispatch(setFen({fen: this.userFen}));
  }

  resetFen(): void {
    this.store.dispatch(setFen({ fen: DEFAULT_FEN }));
  }

  ngOnDestroy(): void {
    // this.boardSize$?.unsubscribe();
  }
}
