import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardContainer } from './core/board/board.container';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
    { path: 'login', component: LandingPageComponent },
    { path: 'home', component: BoardContainer },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
