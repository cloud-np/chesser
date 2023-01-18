import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from './states/board/board.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquareComponent } from './components/square/square.component';
import { BoardComponent } from './components/board/board.component';
import { RowComponent } from './components/row/row.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PieceComponent } from './components/piece/piece.component';


@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    BoardComponent,
    RowComponent,
    PieceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    StoreModule.forRoot({board: boardReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
