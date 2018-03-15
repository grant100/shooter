import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {LobbyComponent} from "./lobby/lobby.component";
import {GameService} from "./services/GameService";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,LobbyComponent
  ],
  imports: [
    BrowserModule,HttpClientModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
