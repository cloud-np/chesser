import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthState } from '../boardState';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private store: Store<AuthState>) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(state => state.token).pipe(
      map(token => {
        if (!token) {
          this.router.navigate(['/login']);
          return false;
        }

        if (!this.validateToken(token)) {
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      })
    );
  }

  validateToken(token: string): boolean {
    // Perform token validation, for example using JWT library.
    // Return true if the token is valid, false otherwise.
    // ...

    return true;
  }
}
