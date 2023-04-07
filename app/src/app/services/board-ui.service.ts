import { Injectable } from '@angular/core';
import { Observable, Subject, startWith } from 'rxjs';
import { Move } from '../models/move.model';
import { Tile } from '../models/tile.model';

@Injectable({
  providedIn: 'root'
})
export class BoardUiService {

  private boardSize = new Subject<number>();
  private pickedTile = new Subject<Tile | null>();
  private lastMove = new Subject<Move | null>();
  private STARTING_BOARD_SIZE: number = 700;
  private currBoardSize: number = this.STARTING_BOARD_SIZE;

  constructor() {
    this.boardSize.next(this.STARTING_BOARD_SIZE);
    this.boardSize.subscribe((size) => {
      this.currBoardSize = size;
    });
  }

  getLastMove(): Observable<Move | null> {
    return this.lastMove.asObservable();
  }

  setLastMove(move: Move | null): void {
    this.lastMove.next(move);
  }

  getPickedTile(): Observable<Tile | null> {
    return this.pickedTile.asObservable();
  }

  setPickedTile(pickedTile: Tile | null): void {
    this.pickedTile.next(pickedTile);
  }

  getBoardSize(): Observable<number> {
    return this.boardSize.asObservable().pipe(startWith(this.STARTING_BOARD_SIZE));
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
