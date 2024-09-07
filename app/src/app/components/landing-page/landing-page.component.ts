import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
    selector: 'app-landing-page',
    template: `
    <div class="form-container">
        <app-login *ngIf="isLogin" (onChangeToRegister)="handleOnChangeToRegister($event)" ></app-login>
        <app-register *ngIf="!isLogin" (onChangeToLogin)="handleOnChangeToLogin($event)" ></app-register>
    </div>
  `,
    styleUrls: ['./landing-page.component.sass'],
    standalone: true,
    imports: [NgIf, LoginComponent, RegisterComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {

    isLogin: boolean = true;
    loginOrRegisterBtn: string = 'Register';
    loginOrRegisterMsg: string = 'Already have an account? Login here!';

    handleOnChangeToLogin($event: any) {
        this.isLogin = true;
    }

    handleOnChangeToRegister($event: any) {
        this.isLogin = false;
    }
}
