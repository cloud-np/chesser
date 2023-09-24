import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing-page',
  // templateUrl: './landing-page.component.html',
  template: `
  <div class="form-container">
    <app-login *ngIf="isLogin" (onChangeToRegister)="handleOnChangeToRegister($event)" ></app-login>
    <app-register *ngIf="!isLogin" (onChangeToLogin)="handleOnChangeToLogin($event)" ></app-register>
  </div>
  `,
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent {

  isLogin: boolean = true;
  loginOrRegisterBtn: string = 'Register';
  loginOrRegisterMsg: string = 'Already have an account? Login here!';

  constructor() { }

  handleOnChangeToLogin($event: any) {
    this.isLogin = true;
  }

  handleOnChangeToRegister($event: any) {
    this.isLogin = false;
  }

}