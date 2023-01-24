import { createAction, props } from '@ngrx/store';

export const playerMove = createAction('[Board] Player Move', props<{ move: string }>());
export const resetFen = createAction('[Board] Fen Reset');
export const setFen = createAction('[Board] SetFen', props<{ fen: string }>());
