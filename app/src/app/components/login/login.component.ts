import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    template: `
    <div class="form-container">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div>
            <label for="email">Email:</label>
            <input type="text" id="email" formControlName="email" required>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" formControlName="password" required>
        </div>
        <button type="submit">Login</button>
        <a (click)="sendOnChangeToRegister($event)" href="" type="submit">Don\'t have an account? Sign up here!</a>
        </form>
    </div>
    `,
    styleUrls: ['./login.component.sass'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    form = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    @Output() onChangeToRegister = new EventEmitter<boolean>();


    constructor(private authService: AuthService) { }

    sendOnChangeToRegister($event: any) {
        $event.preventDefault();
        this.onChangeToRegister.emit(true);
    }

    onSubmit() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        if (this.form.valid) {
            console.log(this.form.value);
            this.authService.login(this.form.value);
        }
    }

}
