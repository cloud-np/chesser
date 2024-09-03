import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './core/board/board.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
    { path: 'login', component: LandingPageComponent },
    { path: 'home', component: BoardComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
