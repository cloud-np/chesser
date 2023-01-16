import { Injectable, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardUiService {

  private boardSize = new Subject<number>();
  private STARTING_BOARD_SIZE: number = 800;

  constructor() {
    this.boardSize.next(this.STARTING_BOARD_SIZE);
  }

  getBoardSize(): Observable<number> {
    return this.boardSize.asObservable();
  }

  reduceBoardSize(): void {
    this.boardSize.next(400);
  }

}
