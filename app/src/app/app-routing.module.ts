import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HomePage } from './pages/home/home.page';

const routes: Routes = [
    { path: 'login', component: LandingPageComponent },
    { path: 'home', component: HomePage },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
