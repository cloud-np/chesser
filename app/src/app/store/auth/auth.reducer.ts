import { createFeatureSelector, createSelector, Action, on, createReducer } from '@ngrx/store';
import { AuthState } from 'src/app/boardState';
import { login, logout } from './auth.actions';

export const initialAuthState: AuthState = {
    token: '',
};

export const authReducer = createReducer(
    initialAuthState,
    on(login, (state, { token }) => {
        return { ...state, token };
    }),
    on(logout, (_) => ({ token: '' }))
)
