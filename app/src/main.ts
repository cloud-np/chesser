import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app/app.component';
import { importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, CommonModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideExperimentalZonelessChangeDetection(),
        provideRouter([])
    ]
}).catch(err => console.error(err));
