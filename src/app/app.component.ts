import { Component } from '@angular/core';
import { ipcRenderer } from "electron";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logValue: string = "No Result....Yet"


  public loadData(): void {
    console.log("Load button clicked");
    console.log("sending request to ipcMain now ..");
    this.logValue = ipcRenderer.sendSync('synchronous-message', 'load-log');
    console.log("received response from ipcMain with value " + this.logValue);

  }
}
