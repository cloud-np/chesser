import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store, private http: HttpClient) { }

  login(formData: any) {
    // call the backend to authenticate the user
    this.http.post<{token: string}>('http://localhost:5000/login', formData).subscribe((response) => {
      console.log(response);
      // if (response.status === 200) {
      // }
      // if () {
      //   // upon success, dispatch the LOGIN action
      this.store.dispatch({ type: 'LOGIN', payload: response.token });
      // }
    });
  }

  logout() {
    this.store.dispatch({ type: 'LOGOUT' });
  }

  signUp() {
    this.store.dispatch({ type: 'SIGNUP' });
  }
}
