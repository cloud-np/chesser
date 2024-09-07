import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-register',
    // templateUrl: './register.component.html',
    template: `
  <div class="form-container">
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" formControlName="username" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="text" id="email" formControlName="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" formControlName="password" required>
      </div>
      <button type="submit">Register</button>
      <a (click)="sendOnChangeToLogin($event)" href="" type="submit">Already have an account? Login here!</a>
    </form>
  </div>
 `,
    styleUrls: ['./register.component.sass'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule]
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)
    ]),
  });

  @Output () onChangeToLogin = new EventEmitter<boolean>();

  sendOnChangeToLogin($event: any) {
    $event.preventDefault();
    this.onChangeToLogin.emit(true);
  }

  onSubmit() {
    if (this.form.valid) {
      // TODO: 
      // Send the data to the backend to register the user.
      // Upon success, dispatch the LOGIN action.
      // Upon failure, display an error message. (email already exists, etc.)
      console.log(this.form.value);
    } else if(this.form.get('password')?.invalid) {
      const passwordControl = this.form.get('password');
      if (passwordControl?.invalid) {
        console.log('Password is invalid');
        console.log(passwordControl.errors)
        if (passwordControl.errors?.['required']) {
          console.log('Password is required');
        } else if (passwordControl.errors?.['minlength']) {
          console.log('Password is too short');
        } else if (passwordControl.errors?.['maxlength']) {
          console.log('Password is too long');
        } else if (passwordControl.errors?.['pattern']) {
          console.log('Password must contain at least one letter and one number');
        }
      }
    } else if(this.form.get('email')?.invalid) {
      console.log('Email is invalid');
    } else if(this.form.get('username')?.invalid) {
      console.log('Username is invalid');
    }
  }
}
