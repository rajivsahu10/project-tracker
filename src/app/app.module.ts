import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxElectronModule } from "ngx-electron";
import { ConsoleRawComponent } from './console-raw/console-raw.component';
import { RepoSelectorComponent } from './repo-selector/repo-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    ConsoleRawComponent,
    RepoSelectorComponent
  ],
  imports: [
    BrowserModule, 
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
