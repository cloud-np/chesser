import { createAction, props } from '@ngrx/store';

const ACTION_PREFIX = '[Board]'

export namespace RouteAction {
    export const navigate = createAction(`${ACTION_PREFIX} Navigate`, props<{ routeName: string, params: string }>());
    export const resetFen = createAction(`${ACTION_PREFIX} Fen Reset`);
}
