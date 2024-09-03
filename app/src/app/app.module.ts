import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from './store/board/board.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquareComponent } from './core/square/square.component';
import { BoardComponent } from './core/board/board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { authReducer } from './store/auth/auth.reducer';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        AppComponent,
        BoardComponent,
        LandingPageComponent,
        LoginComponent,
        RegisterComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        AppRoutingModule,
        FormsModule,
        SquareComponent,
        ReactiveFormsModule,
        StoreModule.forRoot({ board: boardReducer, auth: authReducer }),
        CommonModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule {
}
