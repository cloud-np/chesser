import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardUiService {

  private boardSize = new Subject<number>();
  private STARTING_BOARD_SIZE: number = 700;
  private currBoardSize: number = this.STARTING_BOARD_SIZE;

  constructor() {
    this.boardSize.next(this.STARTING_BOARD_SIZE);
    this.boardSize.subscribe((size) => {
      this.currBoardSize = size;
    });
  }

  getBoardSize(): Observable<number> {
    return this.boardSize.asObservable();
  }

  addBoardSize(addSize: number): void {
    this.boardSize.next(this.currBoardSize + addSize);
  }

  removeBoardSize(addSize: number): void {
    this.boardSize.next(this.currBoardSize - addSize);
  }

  onDestroy(): void {
    this.boardSize.unsubscribe();
  }

}
