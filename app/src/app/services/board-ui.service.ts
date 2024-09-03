import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, startWith, Subject, tap } from 'rxjs';
import { Move } from '../core/move/move.model';
import { Tile } from '../core/tile/tile.model';

const STARTING_BOARD_SIZE = 700;
@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class BoardUiService {

  private boardSize$ = new Subject<number>();
  private pickedTile$ = new Subject<Tile | undefined>();
  private lastMove$ = new Subject<Move | undefined>();
  private currBoardSize: number = STARTING_BOARD_SIZE;

  constructor() {
    this.boardSize$.next(STARTING_BOARD_SIZE);
    this.boardSize$.pipe(
        tap((size: number) => this.currBoardSize = size),
        untilDestroyed(this)
    ).subscribe();
  }

  getLastMove(): Observable<Move | undefined> {
    return this.lastMove$.asObservable();
  }

  setLastMove(move: Move | undefined): void {
    this.lastMove$.next(move);
  }

  getPickedTile(): Observable<Tile | undefined> {
    return this.pickedTile$.asObservable();
  }

  setPickedTile(pickedTile: Tile | undefined): void {
    this.pickedTile$.next(pickedTile);
  }

  getBoardSize(): Observable<number> {
    return this.boardSize$.asObservable().pipe(startWith(STARTING_BOARD_SIZE));
  }

  addBoardSize(addSize: number): void {
    this.boardSize$.next(this.currBoardSize + addSize);
  }

  removeBoardSize(addSize: number): void {
    this.boardSize$.next(this.currBoardSize - addSize);
  }

  onDestroy(): void {
    this.boardSize$.unsubscribe();
  }
}
