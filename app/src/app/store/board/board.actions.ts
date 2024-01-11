import { createAction, props } from '@ngrx/store';

const ACTION_PREFIX = '[Board]'

export namespace BoardAction {
    export const playerMove = createAction(`${ACTION_PREFIX} Player Move`, props<{ move: string }>());
    export const resetFen = createAction(`${ACTION_PREFIX} Fen Reset`);
    export const setFen = createAction(`${ACTION_PREFIX} SetFen`, props<{ fen: string }>());
}
