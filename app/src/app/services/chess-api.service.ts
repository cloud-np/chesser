import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { selectAuthState } from '../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.model';
import { API_URL } from '../api.const';

@Injectable({
    providedIn: 'root'
})
export class ChessApiService implements OnInit {
    token: string = '';

    constructor(private http: HttpClient, private store: Store<AppState>) { }

    ngOnInit(): void {
        this.store.select(selectAuthState).subscribe((state) => {
            this.token = state.token;
        });
    }

    // getData() {
    //     let headers = new HttpHeaders();
    //     headers = headers.set('Authorization', 'Bearer ' + this.token);
    //     return this.http.get(API_URL, { headers: headers });
    // }

    getFen() {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.token);
        return this.http.get(`${API_URL}/fen`);
    }
}

