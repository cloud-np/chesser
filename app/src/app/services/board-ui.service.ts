import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, Subject, startWith, tap } from 'rxjs';
import { Move } from '../core/move/move.model';
import { Tile } from '../core/tile/tile.model';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class BoardUiService {

  private boardSize$ = new Subject<number>();
  private pickedTile$ = new Subject<Tile | undefined>();
  private lastMove$ = new Subject<Move | undefined>();
  private STARTING_BOARD_SIZE: number = 700;
  private currBoardSize: number = this.STARTING_BOARD_SIZE;

  constructor() {
    this.boardSize$.next(this.STARTING_BOARD_SIZE);
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
    return this.boardSize$.asObservable().pipe(startWith(this.STARTING_BOARD_SIZE));
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
